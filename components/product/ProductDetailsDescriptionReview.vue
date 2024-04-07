<template>
  <div class="description-review-area pb-60">
    <div class="container">
      <div class="description-wrapper">
        <div class="description-review-tapbar nav">
          <a class="active" data-bs-toggle="tab" href="#details1"
            >Дополнительная информация</a
          >
          <a data-bs-toggle="tab" href="#details2">Описание товара</a>
        </div>
        <div class="tab-content description-bottom">
          <div id="details1" class="tab-pane active">
            <div class="product-anotherinfo-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td>Состав:</td>
                    <td>
                      Состав: молоко цельное, молоко цельное сгущенное с сахаром
                      (молоко цельное,молоко обезжиренное, сахар), масло
                      сладко-сливочное, сливки из коровьего молока
                    </td>
                  </tr>
                  <tr>
                    <td>Производитель:</td>
                    <td>
                      ООО "Компания Эскимос", Россия, тел: 8 800 100 50 33
                    </td>
                  </tr>
                  <tr>
                    <td>Описание:</td>
                    <td>сливочное, фруктовое/ягодное</td>
                  </tr>
                  <tr>
                    <td>Порция:</td>
                    <td>Мини-ванна (1.300гр), Порция (50гр)</td>
                  </tr>
                  <tr>
                    <td>Другая информация:</td>
                    <td>
                      Пищевая ценность в 100г продукта: белка 3,1 г; жира 8,5 г;
                      углеводов 24,6г. 99ККал
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="details2" class="tab-pane">
            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailsDescriptionReview",
  props: ["product"],
};
</script>
