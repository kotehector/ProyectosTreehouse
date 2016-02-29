package com.treehouse.hector.interactivestory.model;

/**
 * Class para Choice
 */
public class Choice {

    // Variables
    private String mText;
    private int mNextPage;

    //Constructor
    public Choice(String text, int nextPage) {
        mText = text;
        mNextPage = nextPage;
    }

    // Getter & Setter
    public String getText() {
        return mText;
    }

    public void setText(String text) {
        mText = text;
    }

    public int getNextPage() {
        return mNextPage;
    }

    public void setNextPage(int nextPage) {
        this.mNextPage = nextPage;
    }


}
