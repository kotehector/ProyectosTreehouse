package com.treehouse.hector.stormyapp;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;



import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import butterknife.Bind;
import butterknife.ButterKnife;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Para este proyecto vamos a utilizar la libreria OkHttp para hacer las consultas al servidor.
 * La librería la añadimos en el gradle(module:app) como una dependencia
 */
public class MainActivity extends AppCompatActivity {

    // TAG para incluir en los mensajes del LOG
    public static final String TAG = MainActivity.class.getSimpleName();

    // Objeto de la clase que creamos nosotros CurrentWeather
    private CurrentWeather mCurrentWeather;

    // Utilización de la librería Butter Knife para recuperar las vistas (findViewById)
    @Bind(R.id.timeLabel) TextView mTimeLabel;
    @Bind(R.id.temperatureLabel) TextView mTemperatureLabel;
    @Bind(R.id.humidityValue) TextView mHumidityValue;
    @Bind(R.id.precipValue) TextView mPrecipValue;
    @Bind(R.id.summaryLabel) TextView mSummaryLabel;
    @Bind(R.id.iconImageView) ImageView mIconImageView;
    @Bind(R.id.refreshImageView) ImageView mRefreshImageView;
    @Bind(R.id.progressBar) ProgressBar mProgressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this); // Le decimos a Butter Knife el contexto donde actuar

        // Hacemos invisible el Spinner de Actualización del Tiempo Actual
        mProgressBar.setVisibility(View.INVISIBLE);

        // Coordenadas del lugar a mostrar los datos de Tiempo Actual
        final double latitude = 42.324459; //37.8267;
        final double longitude = -8.825552;//-122.423;

        mRefreshImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getForecast(latitude,longitude);
            }
        });

        // Hacemos la petición a
        getForecast(latitude,longitude);

        Log.d(TAG, "Main UI code is running");


    }


    /**
     * Método para hacer la petición por GET a la API de Forecast
     * @param latitude
     * @param longitude
     */
    private void getForecast(double latitude, double longitude) {

        // Construimos URL para servicio HTTP de Forecast
        String apiKey = "b2134323b784884204d51f5ac368afcc";

        String forecastUrl = "https://api.forecast.io/forecast/" + apiKey +"/" + latitude + "," + longitude;

        // Comprobamos si tenemos Red
        if (isNetworkAvailable()) {

            toggleRefresh();

            // Creamos un Cliente utilizando la librería OkHttpClient
            OkHttpClient client = new OkHttpClient();

            // Creamos una Request al servidor de Forecast
            Request request = new Request.Builder().url(forecastUrl).build();

            // Le decimos al Cliente que realice la Llamada al servidor y le enviamos la Consulta
            Call call = client.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            toggleRefresh();
                        }
                    });
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            toggleRefresh();
                        }
                    });

                    try {
                        // Recuperamos el JSON con los datos de la Request a la API de Forecast
                        String jsonData = response.body().string();
                        Log.v(TAG, jsonData);
                        if (response.isSuccessful()) {
                            // Recuperamos los datos del tiempo actual y los guardamos
                            mCurrentWeather = getCurrentDetails(jsonData);
                            // Método para
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    updateDisplay();
                                }
                            });
                        } else {
                            alertUserAboutError();
                        }
                    } catch (IOException e) {
                        Log.e(TAG, "Exception caught: ", e);
                    }
                    catch (JSONException e) {
                        Log.e(TAG, "Exception caught: ", e);
                    }
                }
            });

        } else {
            Toast.makeText(this, getString(R.string.network_unavailable_message), Toast.LENGTH_SHORT).show();
        }
    }


    /**
     * Método para cambiar la imagen del botón de Actualizar los datos por el Spinner(progressbar)
     */
    private void toggleRefresh() {
        if(mProgressBar.getVisibility() == View.INVISIBLE) {
            mProgressBar.setVisibility(View.VISIBLE);
            mRefreshImageView.setVisibility(View.INVISIBLE);
        } else {
            mProgressBar.setVisibility(View.INVISIBLE);
            mRefreshImageView.setVisibility(View.VISIBLE);
        }
    }

    /**
     * Método para actualizar los datos(views) de la pantalla con los datos solicitados a Forecast
     */
    private void updateDisplay() {
        mTemperatureLabel.setText(mCurrentWeather.getTemperature() + "");
        mTimeLabel.setText("At " + mCurrentWeather.getFormattedTime() + " it will be");
        mHumidityValue.setText(mCurrentWeather.getHumidity() + "");
        mPrecipValue.setText(mCurrentWeather.getPrecipChance() + "");
        mSummaryLabel.setText(mCurrentWeather.getSummary());
        Drawable drawable = getResources().getDrawable(mCurrentWeather.getIconId());
        mIconImageView.setImageDrawable(drawable);
    }


    /**
     * Método para crear el objecto con los datos del Tiempo Actual
     * @param jsonData que nos llega de la API de Forecast
     * @return Nuevo objeto con el Tiempo Actual
     * @throws JSONException
     */
    private CurrentWeather getCurrentDetails(String jsonData) throws JSONException{
        // Convertimos el JSON de Forecast para manipular en Andorid
        JSONObject forecast = new JSONObject(jsonData);

        // Recuperamos el TIMEZONE(valor) pasandole la clave(timezone) del JSON de Forecast
        String timezone = forecast.getString("timezone");
        Log.i(TAG, "From JSON: " + timezone);

        // Recuperamos el TiempoActual y lo convertimos en un objeto para manipular
        JSONObject currently = forecast.getJSONObject("currently");

        // Creamos un Objeto de la clase CurrentWeather para almacenar los datos del TiempoActual
        CurrentWeather currentWeather = new CurrentWeather();
        currentWeather.setHumidity(currently.getDouble("humidity"));
        currentWeather.setTime(currently.getLong("time"));
        currentWeather.setIcon(currently.getString("icon"));
        currentWeather.setPrecipChance(currently.getDouble("precipProbability"));
        currentWeather.setSummary(currently.getString("summary"));
        currentWeather.setTemperature(currently.getDouble("temperature"));
        currentWeather.setTimezone(timezone);

        Log.d(TAG, "DATA FORMAT: " + currentWeather.getFormattedTime());

        return currentWeather;
    }


    /**
     * Método para comprobar si tenemos acceso a la red
     * @return True si hay red disponible
     */
    private boolean isNetworkAvailable() {
        ConnectivityManager manager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = manager.getActiveNetworkInfo();
        boolean isAvailable = false;
        if (networkInfo != null && networkInfo.isConnected()) {
            isAvailable = true;
        }
        return isAvailable;
    }


    /**
     * Método para Mostrar el AlertDialogFragment creado por nosotros para manejar el error
     */
    private void alertUserAboutError() {
        AlertDialogFragment dialog = new AlertDialogFragment();
        dialog.show(getFragmentManager(), "error_dialog");
    }
}
