
import pyautogui
import io
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from PIL import Image

import cv2



# abrir o Google Chrome
driver = webdriver.Chrome()

# carregar a página com a tag canvas
driver.get('http://127.0.0.1:5500/cobrinha/index.html')

# esperar um pouco para que a página carregue completamente
time.sleep(2)

# localizar o elemento canvas na página
canvas = driver.find_element(By.ID, 'game')

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
canvas_screenshot = driver.get_screenshot_as_png()
image = Image.open(io.BytesIO(canvas_screenshot))
cropped_image = image.crop((x, y, x+width, y+height))

# salvar o screenshot em um arquivo
cropped_image.save('screenshot_canvas.png')

# Carrega a imagem
img = cv2.imread('screenshot_canvas.png')

# Mostra a imagem na tela
cv2.imshow('Imagem', img)

# Espera pela tecla 'q' ser pressionada para fechar a janela
cv2.waitKey(0)
cv2.destroyAllWindows()

# Captura as coordenadas de um ponto ao clicar na imagem
def get_coordinates(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f'Coordenadas: ({x}, {y})')

# Define a função que será chamada quando um evento do mouse acontecer
cv2.setMouseCallback('Imagem', get_coordinates)

# Espera pela tecla 'q' ser pressionada para fechar a janela
cv2.waitKey(0)
cv2.destroyAllWindows()



input('Pressione qualquer tecla para sair...')
