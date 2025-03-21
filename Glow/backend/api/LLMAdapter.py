# Importing ABC and abstractmethod for creating an abstract base class
from abc import ABC, abstractmethod

class LLMAdapter(ABC):
    # Abstract method to generate a response based on a query (
    @abstractmethod
    def generate_response(self, query)->str:
        raise NotImplementedError()
    
class LLMConnection:
    def __init__(self, llm:LLMAdapter):
        self.llm = llm

    def generate_response(self, query)->str:
        return self.llm.generate_response(query)
    
    def switch_adapter(self, llm:LLMAdapter):
        self.llm = llm