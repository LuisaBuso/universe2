import dash
from dash import Dash, dcc, html, Input, Output, State
import pandas as pd
import plotly.express as px

# Crear la aplicación Dash
app = Dash(__name__, suppress_callback_exceptions=True)

# Cargar datos del CSV
df = pd.read_csv('usuarios.csv')  # Asegúrate de reemplazar 'usuarios.csv' con el nombre real de tu archivo

# Funciones de análisis
def contar_usuarios():
    return len(df)

def usuarios_por_textura(textura):
    if 'textura' in df.columns:
        return df[df['textura'].str.upper() == textura.upper()].shape[0]
    else:
        return 0

# Estilos CSS
styles = {
    'menu': {
        'backgroundColor': '#f8f9fa',
        'padding': '20px',
        'borderRight': '1px solid #dee2e6'
    },
    'content': {
        'padding': '20px'
    },
    'container': {
        'display': 'flex',
        'fontFamily': 'Arial, sans-serif'
    },
    'menuItem': {
        'padding': '10px',
        'cursor': 'pointer'
    }
}

# Layout de la aplicación
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    html.Div([
        html.Div([
            html.H2("Dashboard Menu", style={'marginBottom': '20px'}),
            html.Div([
                html.Div("Resumen General", id='resumen-link', n_clicks=0, style=styles['menuItem']),
                html.Div("Segmentación de Clientes", id='segmentacion-link', n_clicks=0, style=styles['menuItem']),
                html.Div("Análisis Geográfico", id='geografico-link', n_clicks=0, style=styles['menuItem']),
                html.Div("Datos de Clientes", id='clientes-link', n_clicks=0, style=styles['menuItem']),
                html.Div("Consulta de Datos", id='consulta-link', n_clicks=0, style=styles['menuItem']),
                html.Div("Preguntas Personalizadas", id='preguntas-link', n_clicks=0, style=styles['menuItem'])
            ])
        ], style=styles['menu'], className='three columns'),
        html.Div(id='page-content', style=styles['content'], className='nine columns')
    ], style=styles['container'])
])

# Callbacks
@app.callback(
    Output('page-content', 'children'),
    [Input('resumen-link', 'n_clicks'),
     Input('segmentacion-link', 'n_clicks'),
     Input('geografico-link', 'n_clicks'),
     Input('clientes-link', 'n_clicks'),
     Input('consulta-link', 'n_clicks'),
     Input('preguntas-link', 'n_clicks')]
)
def display_page(resumen_clicks, segmentacion_clicks, geografico_clicks, clientes_clicks, consulta_clicks, preguntas_clicks):
    ctx = dash.callback_context
    if not ctx.triggered:
        return html.Div([
            html.H3("Bienvenido al Dashboard"),
            html.P("Selecciona una opción del menú para ver los análisis.")
        ])
    else:
        button_id = ctx.triggered[0]['prop_id'].split('.')[0]
        if button_id == 'resumen-link':
            return html.Div([
                html.H3("Resumen General"),
                html.P(f"Total de usuarios: {contar_usuarios()}"),
            ])
        elif button_id == 'segmentacion-link':
            fig = px.pie(values=segmentacion_clientes().values, names=segmentacion_clientes().index, title="Segmentación de Clientes por Textura del Cabello")
            return dcc.Graph(figure=fig)
        elif button_id == 'geografico-link':
            data = analisis_geografico().reset_index()
            data.columns = ['Prefijo', 'Conteo']
            fig = px.bar(data, x='Prefijo', y='Conteo', title="Análisis Geográfico basado en Prefijo Telefónico")
            return dcc.Graph(figure=fig)
        elif button_id == 'clientes-link':
            return html.Div([
                html.H3("Datos de Clientes"),
                dash_table.DataTable(
                    data=df.to_dict('records'),
                    columns=[{'name': i, 'id': i} for i in df.columns],
                    filter_action="native",
                    sort_action="native",
                    sort_mode="multi",
                    page_size=10
                )
            ])
        elif button_id == 'consulta-link':
            return html.Div([
                html.H3("Consulta de Datos"),
                html.Label("Selecciona la textura del cabello:"),
                dcc.Dropdown(
                    id='textura-dropdown',
                    options=[{'label': t, 'value': t} for t in df['textura'].unique()],
                    value=df['textura'].unique()[0]
                ),
                html.Button('Consultar', id='consultar-btn', n_clicks=0),
                html.Div(id='consulta-result')
            ])
        elif button_id == 'preguntas-link':
            return html.Div([
                html.H3("Preguntas Personalizadas"),
                html.Label("Introduce tu pregunta:"),
                dcc.Input(id='pregunta-input', type='text', value='¿Cuántos usuarios tienen textura ondulado?'),
                html.Button('Enviar', id='enviar-btn', n_clicks=0),
                html.Div(id='respuesta-result')
            ])

@app.callback(
    Output('respuesta-result', 'children'),
    [Input('enviar-btn', 'n_clicks')],
    [State('pregunta-input', 'value')]
)
def responder_pregunta(n_clicks, pregunta):
    if n_clicks > 0:
        pregunta = pregunta.lower().strip()
        
        if 'cuántos usuarios hay' in pregunta or 'cuántos usuarios' in pregunta:
            return f"El número total de usuarios es {contar_usuarios()}."
        
        texturas_disponibles = ['ondulado', 'rizado', 'afro']
        for textura in texturas_disponibles:
            if f'cuántos usuarios tienen textura {textura}' in pregunta or f'cuántos usuarios tienen {textura}' in pregunta:
                cantidad = usuarios_por_textura(textura)
                return f"El número de usuarios con textura {textura.upper()} es {cantidad}."
        
        # Manejo de errores o preguntas no entendidas
        return "No entiendo la pregunta. Intenta con una pregunta diferente."
    return ""

if __name__ == '__main__':
    app.run_server(debug=True, port=8050)
