package com.treehouse.hector.funfacts;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;

public class FunFactsActivity extends AppCompatActivity {
    // creamos el TAG para usar en el LOG

    public static final String TAG = FunFactsActivity.class.getSimpleName();
    // Declaramos la factoría de fact y colores (creadas por nosotros)
    private FactBook mFactBook = new FactBook();
    private ColorWheel mColorWheel = new ColorWheel();
    // Declarar nuestras variables
    private TextView mFactTextView;
    private Button mShowFactButton;
    private RelativeLayout mRelativeLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fun_facts);

        // Asignar los Views desde el archivo layout a las variables.
        mFactTextView = (TextView) findViewById(R.id.factTextView);
        mShowFactButton = (Button) findViewById(R.id.showFactButton);
        mRelativeLayout = (RelativeLayout) findViewById(R.id.relativeLayout);

        // Listener para el boton "Show another fact"
        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Utilizamos los metodos para traer un fact y un color
                String fact = mFactBook.getFact();
                int color = mColorWheel.getColor();

                // Actualizamos el TextView dinámicamente y el background del layout principal
                mFactTextView.setText(fact);
                mRelativeLayout.setBackgroundColor(color);
                mShowFactButton.setTextColor(color);
            }
        };
        // Añadimos el listener al evento "click" del boton
        mShowFactButton.setOnClickListener(listener);
        
        // Toast
        Toast.makeText(FunFactsActivity.this, "Yay! Our Activity was created!", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "We are loggin from de onCreate!");

    }
}
