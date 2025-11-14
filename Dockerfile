# استخدم Node.js LTS
FROM node:22

# أنشئ مجلد العمل داخل الحاوية
WORKDIR /usr/src/app

# انسخ ملفات المشروع
COPY package*.json ./
COPY . .

# ثبّت التبعيات
RUN npm install

# كشف البورت
EXPOSE 3000

# تشغيل السيرفر
CMD ["npm", "run", "dev"]
