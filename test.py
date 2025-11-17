#!/usr/bin/env python3
"""
Test script semplicissimo - versione migliorata! 🎯
"""

def saluta(nome="Mondo"):
    """Funzione che saluta in modo amichevole"""
    return f"Ciao, {nome}! 👋"

def somma(a, b):
    """Somma due numeri e restituisce il risultato"""
    risultato = a + b
    return risultato

# Main
if __name__ == "__main__":
    print(saluta("Claude"))
    print(f"2 + 3 = {somma(2, 3)} ➕")
    print(f"10 * 5 = {10 * 5} ✖️")
    print("🚀 Test completato con successo!")
