import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    //CREATE A ROLE
    await tx.role.createMany({
      data: [
        {
          id: 'genz@role_admin1137024',
          nameRole: 'USER',
          descriptionRole: 'normal account',
        },
        {
          id: 'genz@role_admin1157025',
          nameRole: 'ADMIN',
          descriptionRole: 'run the system',
        },
      ],
    });

    //CREATE ACCOUNT CHAT BOT
    await tx.account.create({
      data: {
        email: 'genz-bot@gmail.com',
        password: 'csmaiocnmxc123',
        aboutMe: 'Tôi là bot',
        address: 'vu tru',
        id: '0308051202024GZMTH',
      },
    });

    //CREATE ACCOUNT ADMIN
    await tx.account.create({
      data: {
        email: 'adnin-genz-mth@gmail.com',
        password: 'genz-mth@18',
        aboutMe: 'Quản trị trang web',
        address: 'việt nam',
        id: 'admi-genz@-id2143492',
        roles: {
          connect: [
            {
              id: 'genz@role_admin1137024',
            },
            {
              id: 'genz@role_admin1157025',
            },
          ],
        },
      },
    });

    //CREATE BASE TAB MENU
    await tx.tabMenu.createMany({
      data: [
        {
          name: 'Trang chu',
          iconUrl: '/home_icon.svg',
          url: '/home',
        },
        {
          name: 'Chuyen gia',
          iconUrl: '/professional_icon.svg"',
          url: '/pro',
        },
        {
          name: 'Ban be',
          iconUrl: '/friend_icon.svg',
          url: '/friends',
        },
        {
          name: 'Chat Bot',
          iconUrl: '/chatbot_icon.svg',
          url: '/chat-bot',
        },
        {
          name: 'Blog',
          iconUrl: '/chatbot_icon.svg',
          url: '/blog',
        },
        {
          name: 'Khong gian ao',
          iconUrl: '/virtual_space_icon.svg',
          url: '/virtual-space',
        },
      ],
    });

    //CREATE PERMISSION POST
    await tx.permisionPost.createMany({
      data: [
        {
          id: 'genzmth@pms_p_345432',
          code: 'bài viết công khai',
          description: 'ai cũng có thể xem được bài viết này',
        },
        {
          id: 'genzmth@pms_p_887123',
          code: 'chỉ mình bạn',
          description: 'chỉ có bạn mới có thể xem được bài viết này',
        },
        {
          id: 'genzmth@pms_p_6673892',
          code: 'theo dõi',
          description:
            'chỉ có người theo dõi bạn mới có thể xem được bài viết này',
        },
      ],
    });

    //CREATE TYPE IMAGE
    await tx.typeImage.createMany({
      data: [
        {
          id: 'genzmth@786521',
          typeImageName: 'loại hình ảnh bài viết người dùng',
        },
        {
          id: 'genzmth@754235',
          typeImageName: 'loại hình ảnh avata người dùng',
        },
        {
          id: 'genzmth@954235',
          typeImageName: 'loại hình ảnh banner của người dùng',
        },
      ],
    });
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
