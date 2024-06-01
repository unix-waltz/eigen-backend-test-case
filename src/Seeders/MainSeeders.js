import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const bookData = [
    { code: "JK-45", title: "Harry Potter", author: "J.K Rowling"},
    { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle"},
    { code: "TW-11", title: "Twilight", author: "Stephenie Meyer"},
    { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien"},
    { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis"},
  ];
  const Members = [
    { code: "M001", name: "Angga"},
    { code: "M002", name: "Ferry"},
    { code: "M003", name: "Putri"},
    { code: "M1210", name: "RIO PUTRA PRATAMA"},
  ];
  async function deleteAllData() {
    await prisma.books.deleteMany({}); 
    console.log("Books deleted successfully!"); 
    await prisma.user.deleteMany({}); 
    console.log("Users deleted successfully!");
  }
  async function seedDatabase() {
    for (const book of bookData) {
      await prisma.books.create({ data: book });
    }
  
    console.log("Books inserted successfully!");
    for (const user of Members) {
      await prisma.user.create({ data: user });
    }
  
    console.log("Users inserted successfully!");
  }
  deleteAllData()
  seedDatabase()
    .catch((error) => {
      console.error("Error inserting books:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });