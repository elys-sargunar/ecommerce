// prisma/seed.js
// import db from "../db/db/db";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const todos = [
    { title: 'Buy groceries', completed: false },
    { title: 'Walk the dog', completed: false, description: "This is a short description" },
    { title: 'Finish project', completed: true , score: 82 },
    { title: 'Call the plumber', completed: false },
    { title: 'Read a book', completed: true },
    { title: 'Send email to boss', completed: false, score: 10 },
    { title: 'Clean the house', completed: false },
    { title: 'Exercise', completed: true },
    { title: 'Plan vacation', completed: false },
    { title: 'Visit parents', completed: true },
  ]

  // Seed the database with tasks
  for (const todo of todos) {
    console.log('Seeding !' + todo.title + ' with score ' + todo.score);
    await prisma.todo.create({      
      data: todo,
    })
  }

  console.log('Seeding complete!')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })