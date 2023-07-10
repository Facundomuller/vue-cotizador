<script setup>

  import {ref, computed, watch} from 'vue'
  import Header from './components/Header.vue'
  import Button from './components/Button.vue'
  import { calcInterestTotal } from './helpers'

  const cantidad = ref(7500);
  const cuotas = ref(6);
  const total = ref(0)
  const MIN = 100;
  const MAX = 15000;
  const STEP = 100;

  const formatCantidad = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD"
    })

    return formatter.format(value);
  };

  watch([cantidad, cuotas], () => {
    total.value = calcInterestTotal(cantidad.value, cuotas.value)
  });

  const calcularMensual = computed(() => {
    return total.value / cuotas.value
  });

  const handleCantidad = (hand) => {
    const value = hand == "-" ? cantidad.value - STEP : cantidad.value + STEP

    if (value < MIN || value > MAX) {
      alert("El valor $" + value + " no es posible")
      return
    }

    cantidad.value = value
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />

    <div class="flex justify-between mt-10">
      <Button
        :operador="'-'"
        @fn="handleCantidad"
      />
      <Button
        :operador="'+'"
        @fn="handleCantidad"
      />
    </div>

    <div class="my-5">
      <input
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="cantidad"
      >

      <p class="my-10 font-semibold text-indigo-600 text-center text-5xl">
        {{ formatCantidad(cantidad) }}
      </p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span class="text-indigo-500">plazo</span> a pagar
      </h2>

      <select
        class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
        v-model.number="cuotas"
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>

    </div>

    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-bold text-gray-500 text-center">
        Resumen <span class="text-indigo-600">de pagos</span>
      </h2>

      <p class="text-xl text-gray-500 text-center font-bold">{{ cuotas }} Meses</p>
      <p class="text-xl text-gray-500 text-center font-bold">
        Total a pagar: {{ formatCantidad(total) }}
      </p>
      <p class="text-xl text-gray-500 text-center font-bold">
        Por mes: <span class="text-indigo-700">{{ formatCantidad(calcularMensual) }}</span>
      </p>
    </div>

    <div v-else class="my-5 space-y-3 bg-gray-50 p-5">
      <p class="text-xl text-gray-500 text-center font-bold">Elige una cantidad para calcular</p>
    </div>

  </div>
</template>
