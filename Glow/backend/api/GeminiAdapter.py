from api.LLMAdapter import LLMAdapter # Importing the base LLMAdapter class
import google.generativeai as genai # Importing Google's generative AI library

class GeminiAdapter(LLMAdapter):

    # Initialize with API key and model name
    def __init__(self, api_key, model_name):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

     # Generate a response from the model based on the input query
    def generate_response(self, query)->str:
        return str(self.model.generate_content(query).text)