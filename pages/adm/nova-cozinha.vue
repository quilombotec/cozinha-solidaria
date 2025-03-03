<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-4">
      <v-card-text>
        <p class="text-h5 text-center font-weight-bold mb-2">
          Cadastro nova cozinha
        </p>

        <v-form @submit.prevent v-model="validado">
          <label class="font-weight-bold text-h6" for="username">
            Nome da cozinha
          </label>
          <v-text-field
            v-model="nome"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="username">Estado</label>
          <v-select
            v-model="estado"
            :items="estados"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-select>

          <label class="font-weight-bold text-h6" for="username">Cidade</label>
          <v-text-field
            v-model="cidade"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="username">Bairro</label>
          <v-text-field
            v-model="bairro"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="Password">Rua</label>
          <v-text-field
            v-model="rua"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="Password">Número</label>
          <v-text-field
            v-model="numero"
            :rules="regras"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <v-row no-gutters justify="space-between">
            <v-btn
              variant="text"
              color="red-darken-4"
              class="text-subtitle-1"
              @click="$router.push('/adm/inicio')"
            >
              Cancelar
            </v-btn>

            <v-btn
              variant="flat"
              color="blue-darken-4"
              class="text-subtitle-1"
              @click="validarCadastro"
            >
              Cadastrar
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: ["admin"],
});

const { regras } = useRegrasFormularioNovaCozinha();
const {
  estados,
  validado,
  nome,
  estado,
  cidade,
  bairro,
  rua,
  numero,
  validarCadastro,
} = useNovaCozinha();
</script>

<style></style>
