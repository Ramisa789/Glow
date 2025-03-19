from textwrap import dedent

'''QueryBuilder Class:
Constructs a query string for generating a personalized skincare routine based on user inputs. 
It formats and validates parameters like skin type, routine type, concerns, allergies, and budget 
before generating a structured query in JSON format for backend processing. '''

class QueryBuilder:
    def __init__(self):
        self.skin_type = None
        self.routine_type = None
        self.skin_concerns = None
        self.product_criteria = None
        self.allergies = None
        self.skin_conditions = None
        self.budget = None
        self.min_price = None
        self.max_price = None

    def __format_argument(self, argument)->str:
        if isinstance(argument, list):
            argument = ', '.join(argument)

        return argument

    def __validate_argument(self, argument):
        return (isinstance(argument, list) or isinstance(argument, str)) and len(argument) != 0            
    
    def add_skin_type(self, skin_type):
        if self.__validate_argument(skin_type):
            self.skin_type = self.__format_argument(skin_type)
        return self

    def add_routine_type(self, routine_type):
        if self.__validate_argument(routine_type):
            self.routine_type = self.__format_argument(routine_type)
        return self

    def add_skin_concerns(self, skin_concerns):
        if self.__validate_argument(skin_concerns):
            self.skin_concerns = self.__format_argument(skin_concerns)
        return self

    def add_product_criteria(self, product_criteria):
        if self.__validate_argument(product_criteria):
            self.product_criteria = self.__format_argument(product_criteria)
        return self

    def add_allergies(self, allergies):
        if self.__validate_argument(allergies):
            self.allergies = self.__format_argument(allergies)
        return self

    def add_skin_conditions(self, skin_conditions):
        if self.__validate_argument(skin_conditions):
            self.skin_conditions = self.__format_argument(skin_conditions)
        return self

    def add_budget(self, budget):
        if self.__validate_argument(budget):
            self.budget = self.__format_argument(budget)
        return self

    def add_min_price(self, min_price):
        if self.__validate_argument(min_price):
            self.min_price = self.__format_argument(min_price)
        return self

    def add_max_price(self, max_price):
        if self.__validate_argument(max_price):
            self.max_price = self.__format_argument(max_price)
        return self

    def build(self):
        # Append the users selections to the query
        query = dedent('''\
        Based on the user's selections, generate a personalized skincare routine.  
        ### User Selections:''')

        if self.skin_type != None:
            query += f"- Skin Type: {self.skin_type}\n"

        if self.routine_type != None:
            query += f"- Routine Type: {self.routine_type}\n"

        if self.skin_concerns != None:
            query += f"- Skin Concerns: {self.skin_concerns}\n"

        if self.product_criteria != None:
            query += f"- Product Criteria: {self.product_criteria}\n"

        if self.allergies != None:
            query += f"- Allergies: {self.allergies}\n"

        if self.skin_conditions != None:
            query += f"- Skin Conditions: {self.skin_conditions}\n"

        if self.budget != None:
            query += f"- Budget: {self.budget}\n"

        if self.min_price != None:
            query += f"- Minimum Product Price: {self.min_price}\n"

        if self.max_price != None:
            query += f"- Maximum Product Price: {self.max_price}\n"
        
        # Append sample response to query
        query += dedent('''\
        ### Expected JSON Format:
        Return the routine **strictly** in this format:  
        {
        "day": [
            {
            "step": 1,
            "name": "Product name",
            "price": "$17.99",
            "application": "steps on how to apply"
            },
            {
            "step": 2,
            "name": "Product name",
            "price": "$25.00",
            "application": "steps on how to apply"
            },
            {
            "step": 3,
            "name": "Product name",
            "price": "$6.00",
            "application": "steps on how to apply"
            }
        ],
        "night": [
            {
            "step": 1,
            "name": "Product name",
            "price": "$17.99",
            "application": "steps on how to apply"
            },
            {
            "step": 2,
            "name": "Product name",
            "price": "$25.00",
            "application": "steps on how to apply"
            },
            {
            "step": 3,
            "name": "Product name",
            "price": "$6.00",
            "application": "steps on how to apply"
            }
        ]
        }
        ''')

        # Append additional constraints
        query += dedent('''\
        ### Constraints:  
        - **Follow the exact JSON structure** provided above.  
        - **Use the same field names** ("day routine" and "night routine") with lowercase keys.  
        - Each routine must be an **array of objects** with: "step", "name", "price", and "application".
        - If the routine type is only "Day", return an empty array for "night routine" and vice versa. If the routine type is both, provide for both day and night.
        - Do **not** include any extra text, explanations, or formatting outside the JSON response.  
        - The string held in the application field currently with placeholder "steps on how to apply" should be no longer than 400 characters.
        - Do **not** include dollar signs on any price fields.
        - The products returned must meet the **selected product criteria**: 
            - Products should be **fragrance-free**, **alcohol-free**, **paraben-free**, **sulfate-free**, **cruelty-free**, etc., **strictly** according to the selected user preferences.
            - Any product that does not meet the selected product criteria should be **excluded** from the routine.
        ''')

        return query

    