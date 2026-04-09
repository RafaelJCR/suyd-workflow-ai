# SUYD Workflow AI

Plataforma de automatizacion empresarial con IA que procesa documentos y comunicaciones de negocio. Incluye tres flujos de trabajo inteligentes: clasificacion de emails, analisis de documentos y calificacion de leads.

Construido con Next.js y el modelo **Qwen 2.5 72B** a traves de la API de HuggingFace.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Qwen](https://img.shields.io/badge/Qwen-2.5_72B-7C3AED)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Inference_API-FFD21E?logo=huggingface&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Flujos de trabajo

### Clasificador de Emails
Categoriza emails automaticamente, asigna prioridad y analiza sentimiento.

```json
{
  "category": "support|sales|billing",
  "priority": "high|medium|low",
  "sentiment": "positive|negative|neutral",
  "summary": "resumen del email",
  "suggested_action": "accion recomendada"
}
```

### Analizador de Documentos
Extrae informacion clave de contratos y documentos: entidades, fechas, montos, temas y acciones pendientes.

```json
{
  "document_type": "contract|agreement",
  "key_entities": ["nombre1", "nombre2"],
  "key_dates": ["fecha1"],
  "key_amounts": ["$100"],
  "action_items": ["tarea1"]
}
```

### Calificador de Leads
Puntua y califica prospectos de venta con nivel de urgencia, presupuesto estimado y pasos recomendados.

```json
{
  "score": 85,
  "qualification": "hot|warm|cold",
  "budget_indicator": "high|medium|low",
  "urgency": "immediate|short-term|long-term",
  "next_steps": ["paso1", "paso2"]
}
```

---

## Arquitectura

```
Usuario
  |
  v
Next.js Frontend (React 18 + Tailwind CSS)
  |
  v
API Routes (/api/classify, /api/analyze, /api/qualify)
  |
  v
Utilidad askAI() + parseJSON() (lib/ai.ts)
  |
  v
HuggingFace Inference API (Qwen 2.5 72B, temp: 0.1)
  |
  v
Resultado estructurado en JSON con badges y barras de progreso
```

---

## Caracteristicas

- Tres workflows especializados con prompts optimizados
- Salida JSON estructurada con parsing inteligente
- Badges con codigo de color por prioridad, sentimiento y calificacion
- Barras de progreso para scores (0-100)
- Interfaz con tema oscuro y efectos glassmorphism
- Temperatura baja (0.1) para resultados consistentes
- Manejo de errores con fallback a texto plano

---

## Stack tecnologico

| Capa | Tecnologia |
|------|-----------|
| Frontend | React 18, Next.js 14, Tailwind CSS 3.4 |
| LLM | Qwen 2.5 72B Instruct (HuggingFace) |
| Backend | Next.js API Routes |
| Utilidades | lib/ai.ts (askAI, parseJSON) |
| Lenguaje | TypeScript 5 |

---

## Instalacion local

```bash
# Clonar el repositorio
git clone https://github.com/RafaelJCR/suyd-workflow-ai.git
cd suyd-workflow-ai

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

Variable de entorno necesaria:

```env
HF_TOKEN=tu_token_de_huggingface
```

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Autor

**Rafael Jose Cedano Rijo** — Fundador de SUYD

[![LinkedIn](https://img.shields.io/badge/LinkedIn-rafaelcedanorijo-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafaelcedanorijo/)
[![GitHub](https://img.shields.io/badge/GitHub-RafaelJCR-181717?logo=github&logoColor=white)](https://github.com/RafaelJCR)
