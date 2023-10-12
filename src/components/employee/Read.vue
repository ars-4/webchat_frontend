<template>
    <div class="profile">

        <div class="header">
            <input type="text" placeholder="Username">
            <button class="btn btn-primary"><span class="icon icon-search"></span></button>
        </div>

        <div class="body">

            <div class="input-group">
                <span class="form-control">{{ profile.username }}</span>
                <span class="form-control">{{ profile.name }}</span>
            </div>
            <div class="input-group">
                <span class="form-control">{{ profile.email }}</span>
                <span class="form-control">{{ profile.phone }}</span>
            </div>
            <div class="input-group">
                <span class="form-control">{{ profile.address }}</span>
                <span class="form-control">group</span>
            </div>

        </div>

    </div>
</template>

<style>
.profile .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.profile .header input {
    width: 75%;
}
.profile .header input,
.profile .body .input-group .form-control {
    padding: 7px 12px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #c3c3c3;
}

.profile .body .input-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0px;
}

.profile .body .input-group .form-control {
    display: block;
    width: 44%;
    margin: 0px 4px;
    border: none;
    background: #fff;
    color: var(--dark);
}
</style>

<script>

export default {

    data() {
        return {
            profile: {
                username: 'Username',
                name: 'Full Name',
                email: 'email@address.com',
                phone: '+1 234 567 890',
                address: 'Address'
            }
        }
    }

}

</script>