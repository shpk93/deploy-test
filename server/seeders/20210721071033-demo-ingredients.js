'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ingredients', [
      {
        type_id: 1, //메인메뉴
        name: '페퍼 치킨 슈니첼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '스테이크 & 치즈',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: 'K-바비큐',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '로스트 치킨',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '풀드 포크 바비큐',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '써브웨이 클럽',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '스파이시 이탈리안',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '치킨 데리야끼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '이탈리안비엠티',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '미트볼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '참치',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '햄',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        name: '베지',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2, //빵
        name: '화이트',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        name: '파마산 오레가노',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        name: '위트',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        name: '허니오트',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        name: '하티',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        name: '플랫브레드',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 3, //치즈
        name: '아메리칸치즈',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 3, //치즈
        name: '슈레드치즈',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 3, //치즈
        name: '모차렐라치즈',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 3, //치즈
        name: '치즈 제외',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '양상추',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '토마토',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '오이',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '피망',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '양파',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '피클',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '올리브',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 4, //야채
        name: '할라피뇨',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '머스타드',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '레드와인식초',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '스위터 어니언',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '허니 머스타드',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '스위트 칠리',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '스모크 바비큐',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '랜치',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '마요네즈',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '핫 칠리',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '사우스 웨스트 치폴레',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '홀스래디쉬',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '올리브 오일',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '소금',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 5, //소스
        name: '후추',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 6, //추가 선택
        name: '에그마요',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 6, //추가 선택
        name: '페퍼로니',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 6, //추가 선택
        name: '베이컨',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 6, //추가 선택
        name: '아보카도',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 6, //추가 선택
        name: '오믈렛',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '풀드포크',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '햄',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '참치',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '미트볼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '비엘티',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '이탈리안 비엠티',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '터키',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '써브웨이 클럽',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '치킨 데리야끼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '스파이시 이탈리안',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '쉬림프',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 7, //미트 추가
        name: '페퍼 치킨 슈니첼',
        img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ingredients', null, {});
  },
};
