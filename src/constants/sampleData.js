// avatar = [], name, _id, (groupChat = false), sameSender, isOnline, newMessageAlert, (index = 0), handleDeleteChatOpen;

export const sampleChats = [
  {
    avatar: [
      "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    name: "Samson Rumba",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    name: "Lian Ying Koh",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: [
      "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    name: "Samson Rumba",
    _id: "1",
  },
  {
    avatar: [
      "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    name: "Lian Ying Koh",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar:
        "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Samson Rumba",
    },
    _id: "1",
  },
  {
    sender: {
      avatar:
        "https://images.unsplash.com/photo-1706694668166-d09c91016064?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhciUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Koh Lian Ying",
    },
    _id: "2",
  },
];

//message samples
export const sampleMessage = [
  {
    attachments: [],
    content: "l*do ko message ho",
    _id: "jfsdkjfkanhsdf",
    sender: {
      _id: "user._id",
      name: "Ranmati",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg",
      },
    ],
    content: "",
    _id: "jfsdkjfkanhsdffds",
    sender: {
      _id: "fkjasdnf",
      name: "Ranmati 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

//the format of the data come from backend
export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "",
      _id: "1",
      username: "John_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Boi",
      avatar: "",
      _id: "2",
      username: "john_boi",
      friends: 20,
      groups: 25,
    },
  ],
  chats: [
    {
      name: "Ranmati Group",
      avatar: ["https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg" },
        { _id: "2", avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg",
      },
    },
    {
      name: "Mero Lamo Group",
      avatar: ["https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg" },
        { _id: "2", avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "khai k khai k ",
      _id: "ranmati",
      sender: {
        avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg",
        name: "Samson",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.6303Z",
    },
    {
      attachments: [
        {
          public_id: "fskajfkj 2",
          url: "",
        },
      ],
      content: "lado kha",
      _id: "hkjhflkjasdf",
      sender: {
        avatar: "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?size=626&ext=jpg",
        name: "samson 2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.6303Z",
    },
  ],
};
