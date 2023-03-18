
import pyautogui

import time
from selenium import webdriver

# abrir o Google Chrome
driver = webdriver.Chrome()

# carregar a página com a tag canvas
driver.get('http://127.0.0.1:5500/cobrinha/index.html')

# esperar um pouco para que a página carregue completamente
time.sleep(5)

# localizar o elemento canvas na página
canvas = driver.find_element_by_tag_name('canvas')
# obter a posição do elemento canvas na tela
location = canvas.location

# obter as dimensões do elemento canvas
size = canvas.size

# calcular a posição do canto superior esquerdo do canvas na tela
x = location['x']
y = location['y']
width = size['width']
height = size['height']

# tirar o screenshot da região do canvas na tela
screenshot = pyautogui.screenshot(region=(x, y, width, height))

# salvar o screenshot em um arquivo
screenshot.save('screenshot_canvas.png')

# fechar o navegador
driver.quit()
