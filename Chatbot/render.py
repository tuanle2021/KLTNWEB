from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import requests
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# URL của API
api_url = 'https://kltn-backend-kkqf.onrender.com/products/all'

# Headers với Authorization
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUzYTZkMmYxOGE5ZGE1YjhiMDAzYyIsImlhdCI6MTczMzk4OTI3OSwiZXhwIjoxNzM0NTk0MDc5fQ.B8_UhFMtcP3_xvvWftBSCUo8-Y8Fe6NKWWgc2gTtyq4'
}

# Gọi API để lấy dữ liệu sản phẩm
response = requests.get(api_url, headers=headers)
data = response.json()
df = pd.DataFrame({
        '_id': [],
        'description': [],
        'category': [],
        'brand': [],
        "text": []
    })

for product in data:
    text = product['description'] + ' ' + product['category_id']['name'] + ' ' + product['brand']
    product_data = [product['_id'], product['description'], product['category_id']['name'], product['brand'], text]
    df.loc[len(df.index)] = product_data

tokenized_text = [text.split() for text in df['text']]
model = Word2Vec(sentences=tokenized_text, vector_size=100, window=5, min_count=1, workers=4)

def average_word2vec(tokens, model):
    vec = [model.wv[word] for word in tokens if word in model.wv]
    return np.mean(vec, axis=0) if vec else np.zeros(model.vector_size)

df['vector'] = df['text'].apply(lambda x: average_word2vec(x.split(), model))

cosine_sim = cosine_similarity(np.vstack(df['vector'].values), np.vstack(df['vector'].values))

def get_recommendations(index, cosine_sim=cosine_sim, top_n=6):
    sim_scores = list(enumerate(cosine_sim[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    product_indices = [i[0] for i in sim_scores]
    return df.iloc[product_indices]

# Ví dụ: Gợi ý sản phẩm cho item đầu tiên
value = get_recommendations(16)

print(value)
@app.route('/pred', methods=['POST'])
def prediction():
    if request.method == 'POST':
        print('Incoming..')
        payload = request.get_json()
        print("payload", payload['body'])
        return "connected", 200

if __name__ == '__main__':
    app.run(port=5001)