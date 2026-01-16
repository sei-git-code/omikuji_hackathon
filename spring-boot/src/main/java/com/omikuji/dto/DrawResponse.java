package com.omikuji.dto;

public class DrawResponse {
    private String result;

    public DrawResponse() {
    }

    public DrawResponse(String result) {
        this.result = result;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
