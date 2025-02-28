<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-4">
      <v-card-text>
        <p class="text-h5 text-center font-weight-bold mb-2">
          Cadastro nova cozinha
        </p>

        <v-form @submit.prevent v-model="validado">
          <label class="font-weight-bold text-h6" for="username">
            Nome do usuário
          </label>
          <v-text-field
            v-model="nome"
            :rules="campoObrigatorio"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="username">E-mail</label>
          <v-text-field
            v-model="email"
            :rules="regrasEmail"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="username"
            >Telefone</label
          >
          <v-text-field
            v-model="telefone"
            :rules="campoObrigatorio"
            variant="outlined"
            validate-on-blur
          ></v-text-field>

          <label class="font-weight-bold text-h6" for="Password">Senha</label>
          <v-text-field
            v-model="senha"
            :rules="regrasSenha"
            variant="outlined"
            :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarSenha = !mostrarSenha"
            :type="mostrarSenha ? 'text' : 'password'"
          ></v-text-field>

          <v-row no-gutters justify="space-between">
            <v-btn
              variant="text"
              color="red-darken-4"
              class="text-subtitle-1"
              @click="$router.push('/login')"
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
  layout: "adm",
  middleware: ["admin"],
});

const mensagemStore = useMensagemStore();

const { data: cozinhas, status } = await useLazyFetch(`/api/cozinhas`, {
  headers: {
    "Content-Type": "application/json",
    // Authorization: usuarioStore.usuario.token,
  },
  onResponseError({ response }) {
    mensagemStore.tipo = "error";
    mensagemStore.mensagem = response._data.mensagem;
    mensagemStore.mostrarMensagem = true;
  },
});
</script>

<style></style>
