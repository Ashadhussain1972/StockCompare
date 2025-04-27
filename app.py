from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import pandas as pd

app = Flask(__name__)
CORS(app) 


proxies = {
    'http': 'http://lum-customer-hl_c9687491-zone-static:rcmzw7zjkz7m@zproxy.lum-superproxy.io:22225',
    'https': 'http://lum-customer-hl_c9687491-zone-static:rcmzw7zjkz7m@zproxy.lum-superproxy.io:22225'
}
proxies = ''

def get_stocks_fundamental_data(stocks):
    all_data = []
    
    for stock in stocks:
        url = f'https://www.screener.in/company/{stock}/consolidated/'
        response = requests.get(url, proxies=proxies)
        
        if response.status_code != 200:
            continue
        
        soup = BeautifulSoup(response.content, "html.parser")
        data = {"stock": stock}
        
        # Get fundamental data
        ratio_container = soup.find("div", {"class": "company-ratios"}).find("ul").findAll("li")
        for ratio in ratio_container:
            name = ratio.find("span", {"class": "name"}).text.strip()
            value = ratio.find("span", {"class": "number"}).text.strip()
            data[name] = value
        
        # Get quarterly data
        qtrly_container = soup.findAll("div", {"class": "responsive-holder fill-card-width"})[0]
        header = qtrly_container.find("thead").findAll("th")[-4:]
        header = [head.text.strip() for head in header]
        rows = qtrly_container.find("tbody").findAll("tr")
        for row in rows[:-1]:
            cols = row.findAll("td")[-4:]
            row_name = row.find("td").text.strip().replace("\xa0+", "")
            for col, head in zip(cols, header):
                name = f"{row_name} {head}"
                value = col.text.strip()
                data[name] = value
        
        # Get balance sheet data
        bal_container = soup.find("section", {"id": "balance-sheet"}).find("div", {"class": "responsive-holder fill-card-width"})
        header = bal_container.find("thead").findAll("th")[-4:]
        header = [head.text.strip() for head in header]
        rows = bal_container.find("tbody").findAll("tr")
        for row in rows:
            cols = row.findAll("td")[-4:]
            row_name = row.find("td").text.strip().replace("\xa0+", "")
            if "Raw PDF" in row_name:
                continue
            for col, head in zip(cols, header):
                name = f"{row_name} {head}"
                value = col.text.strip()
                data[name] = value
        
        all_data.append(data)
    
    return all_data

@app.route('/api/stocks', methods=['GET'])
def get_stocks_data():
    query = request.args.get('query')
    if query:
        symbols = [symbol.strip().upper() for symbol in query.split(',')]
        data = get_stocks_fundamental_data(symbols)
    else:
        data = []
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
