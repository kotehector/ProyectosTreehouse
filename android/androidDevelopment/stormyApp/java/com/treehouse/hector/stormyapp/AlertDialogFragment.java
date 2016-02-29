package com.treehouse.hector.stormyapp;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.Context;
import android.os.Bundle;

/**
 * Clase para el AlertDialog que Extendemos de DialogFragment
 */
public class AlertDialogFragment  extends DialogFragment{

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Recuperamos el contexto de la Activity
        Context context = getActivity();
        // Creamos un Builder para el Cuadro de alerta
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        // Fijamos los textos del Titulo, mensaje y botón del Cuadro de alerta
        builder.setTitle(context.getString(R.string.error_title))
                .setMessage(context.getString(R.string.error_message))
                .setPositiveButton(context.getString(R.string.error_ok_button_text), null);

        // Creamos el Cuadro con el Builder que acabamos de crear.
        AlertDialog dialog = builder.create();
        // Devolvemos el Cuadro de dialogo
        return  dialog;
    }

}
