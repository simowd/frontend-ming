<template>
    <div class="card-auth">
        <v-container>
            <v-row>
                <v-col :cols="7">
                    <div class="logo-auth">
                        <img
                            src="@/assets/logoming-black.png"
                            width="180rem"
                            height="180rem"
                        />
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <v-layout justify-center align-center>
                        <v-form>
                            <v-container class="form-auth">
                                <v-text-field
                                    outlined
                                    :rules="[rules.required, rules.email]"
                                    label="Correo Electrónico"
                                    dense
                                    color="#66698C"
                                    class="login-input"
                                >
                                </v-text-field>
                                <v-text-field
                                    outlined
                                    :rules="[rules.required]"
                                    label="Contraseña"
                                    :type="'password'"
                                    dense
                                    color="#66698C"
                                    class="login-input"
                                >
                                </v-text-field>
                            </v-container>
                            <v-layout justify-center align-center>
                                <v-btn
                                    large
                                    color="#5a595e"
                                    rounded
                                    width="300"
                                    dark
                                    class="login-button"
                                >
                                    Ingresar
                                </v-btn>
                            </v-layout>
                            <div id="text">
                                <v-layout justify-center align-center>
                                    <router-link
                                        to="/register"
                                        class="login-bottom-text"
                                        >¿No tienes cuenta?</router-link
                                    >
                                </v-layout>
                            </div>
                        </v-form>
                    </v-layout>
                </v-col>
                <v-col :cols="5">
                    <img src="@/assets/ugg-login.png" class="logo-auth">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "LoginCard",
    data() {
        return {
            title: "Preliminary report",
            email: "",
            rules: {
                min: (v) => (v && v.length >= 8) || "Min 8 characters",
                required: (value) => !!value || "Required.",
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped>
h1 {
    padding-top: 2rem;
    font-family: "Montserrat", sans-serif;
    text-decoration: none;
    font-weight: 500;
    font-size: 4.5rem;
}
.login-button {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 15px;
}
#text {
    text-align: center;
    text-align: center;
}

#text a {
    padding-top: 2rem;
    font-family: "Montserrat", sans-serif;
    text-decoration: none;
    font-weight: 600;
    color: #66698c;
    font-size: 1.8rem;
}

</style>
