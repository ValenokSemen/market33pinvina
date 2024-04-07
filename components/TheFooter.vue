<template>
  <footer class="footer-area bg-gray pt-100 pb-70">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="copyright mb-30">
            <div class="footer-logo">
              <n-link :to="`/`">
                <img src="/img/logo/logo.png" alt="logo" />
              </n-link>
            </div>
            <p>ИП "Голден Прайд", УНП 491057707</p>
            <p>
              Юридический адрес: Республика Беларусь, 246028, г. Гомель, ул. 2-я
              Революционная 8, пом.1
            </p>
            <p>
              Почтовый адрес: 220037, г. Минск, 2-й переулок Багратиона 17-6
            </p>
            <p>
              Свидетельство о государственной регистрации выдано Гомельским
              горисполкомом 23.04.2013
            </p>
            <div class="footer-social">
              <ul>
                <li>
                  <n-link to="/" class="fa fa-vk" aria-hidden="true"></n-link>
                </li>
                <li>
                  <n-link
                    to="/"
                    class="fa fa-odnoklassniki-square" aria-hidden="true"
                  ></n-link>
                </li>
                <li>
                  <n-link
                    to="/"
                    class="fa fa-instagram"
                    aria-hidden="true"
                  ></n-link>
                </li>
                <li>
                  <n-link
                    to="/"
                    class="fa fa-youtube"
                    aria-hidden="true"
                  ></n-link>
                </li>
                <li>
                  <n-link
                    to="/"
                    class="fa fa-facebook"
                    aria-hidden="true"
                  ></n-link>
                </li>
              </ul>
            </div>
          </div>
          <p></p>
        </div>
        <div class="col">
          <div class="footer-widget mb-30 ml-30">
            <div class="footer-title">
              <h3>Ассортимент</h3>
            </div>
            <div class="footer-list">
              <ul>
                <li>
                  <n-link to="/">Мороженное</n-link>
                </li>
                <li>
                  <n-link to="/">Органическое мороженное</n-link>
                </li>
                <li>
                  <n-link to="/">Коктели</n-link>
                </li>
                <li>
                  <n-link to="/">Десткое мороженное</n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="footer-widget mb-30 ml-30">
            <div class="footer-title">
              <h3>Помощь покупателям</h3>
            </div>
            <div class="footer-list">
              <ul>
                <li>
                  <n-link to="/">Доставка и оплата</n-link>
                </li>
                <li>
                  <n-link to="/">Система скидок</n-link>
                </li>
                <li>
                  <n-link to="/">Центр поддержки</n-link>
                </li>
                <li>
                  <n-link to="/">Список магазинов</n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="footer-widget mb-30 ml-30">
            <div class="footer-title">
              <h3>О компании</h3>
            </div>
            <div class="footer-list">
              <ul>
                <li>
                  <n-link to="/">О нас</n-link>
                </li>
                <li>
                  <n-link to="/">Вакансии</n-link>
                </li>
                <li>
                  <n-link to="/">Блог</n-link>
                </li>
                <li>
                  <n-link to="/">Новости</n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "thefooter",
};
</script>
