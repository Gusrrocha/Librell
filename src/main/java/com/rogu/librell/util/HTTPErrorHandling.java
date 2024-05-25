package com.rogu.librell.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HTTPErrorHandling {
	private String endpoint;
	public String resposta;
	
	public HTTPErrorHandling(String endpoint) {
		this.endpoint = endpoint;
	}
	
	public String returnUrl() {
		try {
			URL url = new URL(endpoint);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			
			int response = conn.getResponseCode();
			if (response == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				String inputLine;
				StringBuilder respon = new StringBuilder();
				while ((inputLine = in.readLine()) != null) {
					respon.append(inputLine);
				}
				in.close();
				resposta = "Resposta: " + respon.toString();
			} else {
				resposta = "Erro HTTP: " + response;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return resposta;
	}

	@Override
	public String toString() {
		return "HTTPErrorHandling [endpoint=" + endpoint + ", resposta=" + resposta + "]";
	}
	
	
}
