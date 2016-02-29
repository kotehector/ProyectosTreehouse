package com.treehouse.hector.interactivestory.ui;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.treehouse.hector.interactivestory.R;
import com.treehouse.hector.interactivestory.model.Page;
import com.treehouse.hector.interactivestory.model.Story;

public class StoryActivity extends AppCompatActivity {

    // Variables
    public static final String TAG = StoryActivity.class.getSimpleName();
    public Story mStory = new Story();
    private ImageView mImageView;
    private TextView mTextView;
    private Button mChoice1;
    private Button mChoice2;
    private String mName;
    private Page mCurrentPage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_story);

        // Recogemos el Intent que viene del MainActivity
        Intent intent = getIntent();
        // Guardamos en variables los datos enviados desde el MainActivity
        mName = intent.getStringExtra(getString(R.string.main_name));
        if (mName == null) {
            mName = "FRIEND";
        }
        Log.d(TAG, mName);

        // Recuperamos las Vistas para manipularlas
        mImageView = (ImageView)findViewById(R.id.storyImageView);
        mTextView = (TextView)findViewById(R.id.storyTextView);
        mChoice1 = (Button)findViewById(R.id.choiceButton1);
        mChoice2 = (Button)findViewById(R.id.choiceButton2);

        // Cargamos la página
        loadPage(0);
    }


    /**
     * Método para cargar los datos de la página
     */
    private void loadPage(int choice) {
        // Creamos una página
        mCurrentPage = mStory.getPage(choice);

        // Creamos un recurso Drawable para recuperar el id de la página
        Drawable drawable = getResources().getDrawable(mCurrentPage.getImageId());
        mImageView.setImageDrawable(drawable);

        // Insertamos el texto correspondiente a la página
        String pageText = mCurrentPage.getText();
        // Añade el nombre si el usuario lo teclea. No lo añade si no lo teclea.
        pageText = String.format(pageText, mName);
        mTextView.setText(pageText);

        if(mCurrentPage.isFinal()) {
            mChoice1.setVisibility(View.INVISIBLE);
            mChoice2.setText("PLAY AGAIN");
            mChoice2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    finish();
                }
            });
        } else {
            // Recuperamos el texto de cada elección del usuario
            mChoice1.setText(mCurrentPage.getChoice1().getText());
            mChoice2.setText(mCurrentPage.getChoice2().getText());

            //Evento "click" para la eleccion1
            mChoice1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int nextPage = mCurrentPage.getChoice1().getNextPage();
                    loadPage(nextPage);
                }
            });

            //Evento "click" para la eleccion2
            mChoice2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int nextPage = mCurrentPage.getChoice2().getNextPage();
                    loadPage(nextPage);
                }
            });
        }


    }

}
