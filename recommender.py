import string
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests

# Load the dataset
df = pd.read_csv('dog_breeds.csv')

# Initialize TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['description'])

def fetch_dog_image(breed_name):
    breed_name = breed_name.lower().replace(" ", "-").split()[0]
    url = f"https://dog.ceo/api/breed/{breed_name}/images/random"
    response = requests.get(url)    
    if response.status_code == 200:
        return response.json().get('message')
    return "/static/dog_images/default.jpg"

def recommend_breed(user_input):
    user_input = user_input.lower().translate(str.maketrans('', '', string.punctuation))
    user_input_tfidf = vectorizer.transform([user_input])
    similarities = cosine_similarity(user_input_tfidf, tfidf_matrix)
    index = similarities.argmax()
    breed_name = df['breed'][index]
    image_url = fetch_dog_image(breed_name)
    return breed_name, image_url

#Affenpinscher