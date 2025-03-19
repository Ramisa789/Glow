from api.LLMAdapter import LLMAdapter
import google.generativeai as genai

class GeminiAdapter(LLMAdapter):
    def __init__(self, api_key, model_name):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def generate_response(self, query)->str:
        return str(self.model.generate_content(query).text)