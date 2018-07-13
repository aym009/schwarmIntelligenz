const mongoose = require( 'mongoose' );
const User = require('../models/user');
const Project = require('../models/project');
const Idea = require('../models/idea');
const Comment = require('../models/comment');

const dbName = "ironhack-project-3";
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
  {
    email : "test01@ih.com",
    name: "testUser01",
    pictureUrl: ""
  },
  {
    email : "test02@ih.com",
    name: "testUser02",
    pictureUrl: ""
  },
  {
    email : "test03@ih.com",
    name: "testUser03",
    pictureUrl: ""
  },
  {
    email : "test04@ih.com",
    name: "testUser04",
    pictureUrl: ""
  },
  {
    email : "test05@ih.com",
    name: "testUser05",
    pictureUrl: ""
  },
  {
    email : "test06@ih.com",
    name: "testUser06",
    pictureUrl: ""
  }
];

const projects = [
  {
    title: "Test Project01",
    description: "String",
    _members: [],
    statusOpen: true
  }
];

const ideas = [
  {
    text: "Test Idea01",
    pictureUrl: "String",
    position: []
  }
];

const comments = [
  {
    text: "Test Comment01",
  }
];

User.deleteMany()
  .then( () => User.create(users) )
  .then( () => {
    console.log( "created user" );
    mongoose.disconnect();
  })
  .catch( err => { throw( err ) });
Project.deleteMany()
  .then( () => Project.create(projects) )
  .then( () => {
    console.log( "created project" );
    mongoose.disconnect();
  })
  .catch( err => { throw( err ) });
Idea.deleteMany()
  .then( () => Idea.create(ideas) )
  .then( () => {
    console.log( "created idea" );
    mongoose.disconnect();
  })
  .catch( err => { throw( err ) });
Comment.deleteMany()
  .then( () => Comment.create(comments) )
  .then( () => {
    console.log( "created comment" );
    mongoose.disconnect();
  })
  .catch( err => { throw( err ) });
