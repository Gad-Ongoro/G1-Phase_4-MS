from random import choice as rc
from rest_framework import views
from rest_framework.response import Response
from . import serializers
from . import utils
from bs4 import BeautifulSoup

class ScraperAPIView(views.APIView):
    serializer_class = serializers.WebScraperSerializer

    def get(self, request, *args, **kwargs):
        data = []
        search_term = request.query_params.get('search', None)

        if request.GET.get('location'):
            location = request.GET.get('location')
            html_content = utils.get_scrape_content(location)
            soup = BeautifulSoup(html_content, 'html.parser')

            all_items = soup.find_all('li', class_='grid__item')
            
            for item in all_items:
                name_tag = item.find('h3', class_='product-title').find('a')
                price_tag = item.find('span', class_='price-item')

                if name_tag and price_tag:
                    name = name_tag.text.strip()
                    price = price_tag.text.strip().replace('KSh', '')
                    product_info = {
                        'name':name,
                        'price':price,
                    } 
                    data.append(product_info)

        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)