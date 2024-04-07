<template>
    <ul>
        <li>
            <n-link to="/">Домой</n-link>
        </li>
        <li>
            <n-link to="/shop">Ассортимент <i class="fa fa-angle-down"></i></n-link>
            <ul class="submenu">
                <li><n-link to="/shop">Мороженное</n-link></li>
                <li><n-link to="/desserts">Десерты</n-link></li>
                <li><n-link to="/gifts">Подарочные наборы</n-link></li>
                <li><n-link to="/drinks">Напитки</n-link></li>
            </ul>
        </li>
        <li>
            <n-link to="">
                Страницы <i class="fa fa-angle-down"></i>
            </n-link>
            <ul class="submenu">
                <li><n-link to="/cart">Корзина</n-link></li>
                <li><n-link to="/blog">Блог</n-link></li>
                <li><n-link to="/checkout">Оформление заказа</n-link></li>
                <li><n-link to="/login-register">Логин / Регистрация</n-link></li>
            </ul>
        </li>
        <li>
            <n-link to="/contact">Контакты</n-link>
        </li>
    </ul>        
</template>