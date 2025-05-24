from django.core.management.base import BaseCommand
from recipes.services import SpoonacularService

class Command(BaseCommand):
    help = 'Import recipes from Spoonacular API'

    def add_arguments(self, parser):
        parser.add_argument('--number', type=int, default=10, help='Number of recipes to import')
        parser.add_argument('--tags', type=str, help='Comma-separated tags for filtering recipes')
        parser.add_argument('--query', type=str, help='Search query for recipes')

    def handle(self, *args, **options):
        service = SpoonacularService()
        number = options['number']
        
        if options['query']:
            self.stdout.write(f"Searching for recipes with query: {options['query']}")
            results = service.search_recipes(query=options['query'], number=number)
            
            if 'results' in results:
                for recipe_data in results['results']:
                    recipe = service.import_recipe_to_db(recipe_data)
                    self.stdout.write(f"Imported: {recipe.title}")
                    
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(results['results'])} recipes"))
            else:
                self.stdout.write(self.style.ERROR(f"Error: {results.get('error', 'Unknown error')}"))
        else:
            tags = options['tags'].split(',') if options['tags'] else None
            self.stdout.write(f"Importing {number} random recipes")
            
            if tags:
                self.stdout.write(f"With tags: {tags}")
                
            imported_recipes = service.import_random_recipes(number=number, tags=tags)
            
            if isinstance(imported_recipes, list):
                self.stdout.write(self.style.SUCCESS(f"Successfully imported {len(imported_recipes)} recipes"))
            else:
                self.stdout.write(self.style.ERROR(f"Error: {imported_recipes.get('error', 'Unknown error')}"))
