export const Samplechats = [
  {
    _id: 1,
    name: "John",
    avatar: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLn5Te13DnFe8gprmapg_KwfD55cM99LVepA&s",
    ],
    GroupChat: false,
    sameSender: false,
    isOnline: true,
    newMessageAlert: {
      count: 0,
    },
    members: ["1", "2", "3"],
  },
  {
    _id: 2,
    name: "Jane",
    avatar: [
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1712757681~exp=1712758281~hmac=24fe31b4cc604bd8b9288c0ac76af869f78d083af55eb2a25bc9ae9afd8d53f8",
    ],
    GroupChat: false,
    sameSender: false,
    isOnline: true,
    newMessageAlert: {
      count: 0,
    },
  },
  {
    _id: 3,
    name: "Doe",
    avatar: [
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
    ],
    GroupChat: false,
    sameSender: false,
    isOnline: true,
    newMessageAlert: {
      count: 0,
    },
  },
  {
    _id: 4,
    name: "Group 1",
    avatar: [
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
    ],
    GroupChat: true,
    sameSender: false,
    isOnline: true,
    newMessageAlert: {
      count: 0,
    },
  },
];

export const SampleUsers = [
  {
    avatar:
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
    name: "Doe",
    _id: 3,
  },
  {
    avatar:
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
    name: "Jane",
    _id: 2,
  },
  {
    avatar:
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
    name: "John",
    _id: 1,
  },
];

export const SampleNotifications = [
  {
    _id: "1",
    message: "John has sent you a friend request",
    sender: {
      avatar:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
      name: "John",
    },
  },
  {
    _id: "2",
    message: "Jane has sent you a friend request",
    sender: {
      avatar:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
      name: "Jane",
    },
  },
  {
    _id: "3",
    message: "Doe has sent you a friend request",
    sender: {
      avatar:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1219724508.1709959508&semt=sph",
      name: "Doe",
    },
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "sample",
        url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    ],
    content: "Hello",
    _id: "adasdasdasd",
    sender: {
      _id: "1",
      name: "John",
    },
    chat: "chatId",
    createdAt: "2021-10-01T00:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "sample",
        url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    ],
    content: "Hello",
    _id: "adasdasd",
    sender: {
      _id: "2",
      name: "Jane",
    },
    chat: "chatId",
    createdAt: "2021-10-01T00:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "sample",
        url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    ],
    content: "Hello",
    _id: "asdsadsdasdsadasd",
    sender: {
      _id: "3",
      name: "Doe",
    },
    chat: "chatId",
    createdAt: "2021-10-01T00:00:00.000Z",
  },
];

export const DashboardData = {
  users: [
    {
      name: "John",
      avatar:
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      _id: "1",
      username: "john",
      friends: 20,
      groups: 10,
    },
    {
      name: "Jane",
      avatar:
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      _id: "2",
      username: "jane",
      friends: 20,
      groups: 10,
    },
    {
      name: "Doe",
      avatar:
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      _id: "3",
      username: "doe",
      friends: 20,
      groups: 10,
    },
  ],

  chats: [
    {
      name: "labadDass group",
      avatar: [
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      ],
      _id: "1",
      totalMembers: 20,
      members: [
        {
          _id: "1",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "2",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "3",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      totalMessages: 20,
      groupChat: false,
      creator: {
        name: "John",
        avatar:
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    },
    {
      name: "Lussan group",
      avatar: [
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      ],
      _id: "2",
      totalMembers: 20,
      members: [
        {
          _id: "1",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "2",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "3",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      totalMessages: 20,
      groupChat: false,
      creator: {
        name: "Jane",
        avatar:
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    },
    {
      name: "m nhi btaunga group",
      avatar: [
        "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      ],
      _id: "3",
      totalMembers: 210,
      members: [
        {
          _id: "1",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "2",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
        {
          _id: "3",
          avatar:
            "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      totalMessages: 3420,
      groupChat: false,
      creator: {
        name: "Doe",
        avatar:
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
      },
    },
  ],

  messages: [
    {
      attachments: [
        {
          public_id: "sample",
          url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      content: "Hello",
      _id: "adasdasdasd",
      sender: {
        _id: "1",
        name: "John",
        avatar: [
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        ],
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2021-10-01T00:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "sample",
          url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      content: "Hello",
      _id: "adasdasd",
      sender: {
        _id: "2",
        name: "Jane",
        avatar: [
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        ],
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2021-10-01T00:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "sample",
          url: "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        },
      ],
      content: "La*de ka hello",
      _id: "asdsadsdasdsadasd",
      sender: {
        _id: "3",
        name: "Doe",
        avatar: [
          "https://res.cloudinary.com/djvjxp2am/image/upload/v1632965829/sample.jpg",
        ],
      },
      groupChat: true,
      chat: "chatId",
      createdAt: "2021-10-01T00:00:00.000Z",
    },
  ],
};
