const listHelper = require('../utils/list_helper')
const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const biggerList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  expect(listHelper.dummy(emptyList)).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })
  
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })
  
  test('of a bigger list is calulated right', () => {
    expect(listHelper.totalLikes(biggerList)).toBe(36)
  })
})

describe('favourite blog', () => {
  test('is {} with empty list', () => {
    expect(listHelper.favouriteBlog(emptyList)).toEqual({})
  })
  
  test('is the one when list has only one blog in list', () => {
    expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  
  test('is the one with most likes with bigger list', () => {
    expect(listHelper.favouriteBlog(biggerList)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('is {} with empty list', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual({})
  })
  test('is the one with only one blog in list', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('is the one with most blogs with bigger list', () => {
    expect(listHelper.mostBlogs(biggerList)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('is {} with empty list', () => {
    expect(listHelper.mostLikes(emptyList)).toEqual({})
  })
  test('is the one with only one blog in list', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('is the one with most likes with bigger list', () => {
    expect(listHelper.mostLikes(biggerList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
