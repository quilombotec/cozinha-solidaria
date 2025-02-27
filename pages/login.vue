<template>
  <v-container fluid>
    <v-card max-width="600" class="mx-auto mt-4">
      <v-card-text>
        <p class="text-h5 text-center font-weight-bold mb-2">Login</p>

        <v-row no-gutters align="center">
          <v-col>
            <v-form @submit.prevent v-model="validado">
              <p class="font-weight-bold text-h6">E-mail</p>
              <v-text-field
                v-model="email"
                :rules="regrasEmail"
                variant="outlined"
                validate-on-blur
              ></v-text-field>

              <p class="font-weight-bold text-h6">Senha</p>
              <v-text-field
                :rules="regrasSenha"
                v-model="senha"
                variant="outlined"
                :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mostrarSenha = !mostrarSenha"
                :type="mostrarSenha ? 'text' : 'password'"
              ></v-text-field>

              <v-row no-gutters justify="space-between">
                <v-btn
                  variant="text"
                  color="blue-darken-4"
                  class="text-subtitle-1"
                  @click="$router.push('/cadastro')"
                >
                  Cadastre-se
                </v-btn>

                <v-btn
                  @click="loginValidacao"
                  type="submit"
                  elevation="0"
                  color="red"
                  :loading="carregando"
                >
                  login
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
definePageMeta({
  layout: "login",
});
const { smAndDown } = useDisplay();

const { carregando, email, senha, validado, mostrarSenha, loginValidacao } =
  useLogin();

const { regrasEmail, regrasSenha } = useRegrasFormularioLogin();
</script>
