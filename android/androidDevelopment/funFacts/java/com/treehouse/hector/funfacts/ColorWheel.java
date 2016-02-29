package com.treehouse.hector.funfacts;

import android.graphics.Color;

import java.util.Random;

/**
 * Created by Hector on 25/2/16.
 */
public class ColorWheel {
    // Variables (propiedades)
    private String[] mColors = {
            "#39add1", // light blue
            "#3079ab", // dark blue
            "#c25975", // mauve
            "#e15258", // red
            "#f9845b", // orange
            "#838cc7", // lavender
            "#7d669e", // purple
            "#53bbb4", // aqua
            "#51b46d", // green
            "#e0ab18", // mustard
            "#637a91", // dark gray
            "#f092b0", // pink
            "#b7c0c7"  // light gray
    };

    // Métodos (acción que puede hacer)
    public int getColor() {
        // Declaramos el color
        String color;

        // Seleccionamos un color aleatorio.
        Random randomGenerator = new Random();
        int randomNumber = randomGenerator.nextInt(mColors.length);
        color = mColors[randomNumber];
        int colorAsInt = Color.parseColor(color);

        return colorAsInt;
    }
}