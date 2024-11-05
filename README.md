# Animal Blog Website

**Animal Blog Website** is an interactive platform for animal enthusiasts, pet owners, and wildlife lovers to share stories, experiences, and information about various animals. Developed by **Webixar IT Solutions**, this website allows users to post blogs, explore pet recommendations, and access support through an AI chatbot.

## Features

1. **Responsive UI**: User-friendly and adaptable across devices.
2. **Blog Management**: Users can post, read, and explore blogs by category.
3. **Authentication**: Secure user login and registration.
4. **Visitor Tracking**: Real-time analytics on site visits.
5. **AI Chatbot**: Offers support, answers questions, and assists with navigation.
6. **Pet Recommender**: Suggests dog breeds based on user preferences.

## Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Backend**: Python (Flask)
- **Database**: PostgreSQL
- **Libraries**: TfidfVectorizer, Cosine Similarity, Flask templating

## Installation

### Prerequisites

- Python 3.8+
- PostgreSQL

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chinmaykatdare05/Animal-Blog-Website.git
   cd animal-blog-website
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up PostgreSQL database:**

- Create a new PostgreSQL database for the project.
- Update database credentials in the `config.py` file.

4. **Run the application:**
   ```bash
   flask run
   ```

## System Block Diagram

The system architecture of the Animal Blog Website supports multiple core functions, including user registration, login, blogging, and personalized pet recommendations. Users interact with the website through a web interface to view, register, log in, and contribute content, all managed through a central platform. Blog content is stored in a backend database, allowing users to read, engage with, and add their own posts. A key feature is the Pet (Dog Breed) Recommender, which uses algorithms like collaborative or content-based filtering to suggest suitable dog breeds based on user preferences. Additionally, an AI Bot Helper enhances user experience by providing personalized assistance, tips, and answers to common questions.

