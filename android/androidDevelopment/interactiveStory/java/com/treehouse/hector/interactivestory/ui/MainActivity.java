package com.treehouse.hector.interactivestory.ui;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.treehouse.hector.interactivestory.R;

public class MainActivity extends AppCompatActivity {

    // Variables
    private EditText mNameField;
    private Button mStartButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Recogemos los datos de la vista y los guardamos en nuestras variables
        mNameField = (EditText)findViewById(R.id.nameEditText);
        mStartButton = (Button)findViewById(R.id.startButton);

        // Creamos el evento al "click" del botón
        mStartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Pasamos el texto del EditText a una variable
                String name = mNameField.getText().toString();
                // Le pasamos el dato del EditText a la nueva Activity
                startStory(name);
            }
        });
    }

    /*
     *  Método para lanzar StoryActivity.class
     *  Args: String -> nombre que el usuario introduce en el EditText
     */
    private void startStory(String name) {
        // Creamos un Intent con el contexto de esta clase y la classe que queremos lanzar
        Intent intent = new Intent(this, StoryActivity.class);
        // Le pasamos los datos al Intent
        intent.putExtra(getString(R.string.main_name), name);
        // Lanzamos el Intent
        startActivity(intent);
    }

    @Override
    protected void onResume() {
        super.onResume();
        //mNameField.setText("");
    }
}
