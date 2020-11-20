<template>
    <div>
        <NavBar />
        <LoginCard />
    </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import LoginCard from "../components/login/LoginCard.vue"
export default {
    name: "Login",
    components: {
        NavBar,
        LoginCard
    },
    
};
</script>
