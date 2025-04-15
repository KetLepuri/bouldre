export const layouts: Record<string, {
  name: string;
  gridCols: number;
  gridRows: number;
  kickboardRows: number[];
  usableRows: number[];
  spacing: {
    horizontal_cm: number;
    vertical_cm: number;
  };
  holds: {
    id: number;
    x: number;
    y: number;
    row?: number;
    angle?: number | null;
    type: string;
    w?: number;
    h?: number;
  }[];
}> ={
  "layout_12x12_gym": {
    "name": "Kilter Board 12x12 (Gym)",
    "gridCols": 47,
    "gridRows": 35,
    "kickboardRows": [1, 2, 3, 4],
    "usableRows": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "spacing": {
      "horizontal_cm": 30,
      "vertical_cm": 20
    },
    "holds": [
      {
        "id": 800,
        "x": 0,
        "y": 17,
        "row": 1,
        "angle": 172,
        "type": "foot"
      },
      {
        "id": 801,
        "x": 1,
        "y": 17,
        "row": 1,
        "angle": 178,
        "type": "foot"
      },
      {
        "id": 802,
        "x": 2,
        "y": 17,
        "row": 1,
        "angle": 200,
        "type": "foot"
      },
      {
        "id": 803,
        "x": 3,
        "y": 17,
        "row": 1,
        "angle": 125,
        "type": "foot"
      },
      {
        "id": 804,
        "x": 4,
        "y": 17,
        "row": 1,
        "angle": 120,
        "type": "foot"
      },
      {
        "id": 805,
        "x": 5,
        "y": 17,
        "row": 1,
        "angle": 260,
        "type": "foot"
      },
      {
        "id": 806,
        "x": 6,
        "y": 17,
        "row": 1,
        "angle": 185,
        "type": "foot"
      },
      {
        "id": 807,
        "x": 7,
        "y": 17,
        "row": 1,
        "angle": 160,
        "type": "foot"
      },
      {
        "id": 808,
        "x": 8,
        "y": 17,
        "row": 1,
        "angle": 100,
        "type": "foot"
      },
      {
        "id": 809,
        "x": 9,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 810,
        "x": 10,
        "y": 17,
        "row": 1,
        "angle": 228,
        "type": "foot"
      },
      {
        "id": 811,
        "x": 11,
        "y": 17,
        "row": 1,
        "angle": 80,
        "type": "foot"
      },
      {
        "id": 812,
        "x": 12,
        "y": 17,
        "row": 1,
        "angle": 355,
        "type": "foot"
      },
      {
        "id": 813,
        "x": 13,
        "y": 17,
        "row": 1,
        "angle": 245,
        "type": "foot"
      },
      {
        "id": 814,
        "x": 14,
        "y": 17,
        "row": 1,
        "angle": 178,
        "type": "foot"
      },
      {
        "id": 815,
        "x": 15,
        "y": 17,
        "row": 1,
        "angle": 227,
        "type": "foot"
      },
      {
        "id": 816,
        "x": 16,
        "y": 17,
        "row": 1,
        "angle": 182,
        "type": "foot"
      },
      {
        "id": 817,
        "x": 17,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 818,
        "x": 18,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 819,
        "x": 19,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 820,
        "x": 20,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 821,
        "x": 21,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 822,
        "x": 22,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 823,
        "x": 23,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 824,
        "x": 24,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 825,
        "x": 25,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 826,
        "x": 26,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 827,
        "x": 27,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 828,
        "x": 28,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 829,
        "x": 29,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 830,
        "x": 30,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 831,
        "x": 31,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 832,
        "x": 32,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 833,
        "x": 33,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 834,
        "x": 34,
        "y": 17,
        "row": 1,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 847,
        "x": 0,
        "y": 18,
        "row": 2,
        "angle": 200,
        "type": "foot"
      },
      {
        "id": 848,
        "x": 1,
        "y": 18,
        "row": 2,
        "angle": 145,
        "type": "foot"
      },
      {
        "id": 849,
        "x": 2,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 850,
        "x": 3,
        "y": 18,
        "row": 2,
        "angle": 205,
        "type": "foot"
      },
      {
        "id": 851,
        "x": 4,
        "y": 18,
        "row": 2,
        "angle": 150,
        "type": "foot"
      },
      {
        "id": 852,
        "x": 5,
        "y": 18,
        "row": 2,
        "angle": 355,
        "type": "foot"
      },
      {
        "id": 853,
        "x": 6,
        "y": 18,
        "row": 2,
        "angle": 182,
        "type": "foot"
      },
      {
        "id": 854,
        "x": 7,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 855,
        "x": 8,
        "y": 18,
        "row": 2,
        "angle": 260,
        "type": "foot"
      },
      {
        "id": 856,
        "x": 9,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 857,
        "x": 10,
        "y": 18,
        "row": 2,
        "angle": 110,
        "type": "foot"
      },
      {
        "id": 858,
        "x": 11,
        "y": 18,
        "row": 2,
        "angle": 248,
        "type": "foot"
      },
      {
        "id": 859,
        "x": 12,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 860,
        "x": 13,
        "y": 18,
        "row": 2,
        "angle": 215,
        "type": "foot"
      },
      {
        "id": 861,
        "x": 14,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 862,
        "x": 15,
        "y": 18,
        "row": 2,
        "angle": 205,
        "type": "foot"
      },
      {
        "id": 863,
        "x": 16,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 864,
        "x": 17,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 865,
        "x": 18,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 866,
        "x": 19,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 867,
        "x": 20,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 868,
        "x": 21,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 869,
        "x": 22,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 870,
        "x": 23,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 871,
        "x": 24,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 872,
        "x": 25,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 873,
        "x": 26,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 874,
        "x": 27,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 875,
        "x": 28,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 876,
        "x": 29,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 877,
        "x": 30,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 878,
        "x": 31,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 879,
        "x": 32,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 880,
        "x": 33,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 881,
        "x": 34,
        "y": 18,
        "row": 2,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 894,
        "x": 0,
        "y": 19,
        "row": 3,
        "angle": 182,
        "type": "foot"
      },
      {
        "id": 895,
        "x": 1,
        "y": 19,
        "row": 3,
        "angle": 105,
        "type": "foot"
      },
      {
        "id": 896,
        "x": 2,
        "y": 19,
        "row": 3,
        "angle": 100,
        "type": "foot"
      },
      {
        "id": 897,
        "x": 3,
        "y": 19,
        "row": 3,
        "angle": 340,
        "type": "foot"
      },
      {
        "id": 898,
        "x": 4,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 899,
        "x": 5,
        "y": 19,
        "row": 3,
        "angle": 90,
        "type": "foot"
      },
      {
        "id": 900,
        "x": 6,
        "y": 19,
        "row": 3,
        "angle": 175,
        "type": "foot"
      },
      {
        "id": 901,
        "x": 7,
        "y": 19,
        "row": 3,
        "angle": 175,
        "type": "foot"
      },
      {
        "id": 902,
        "x": 8,
        "y": 19,
        "row": 3,
        "angle": 350,
        "type": "foot"
      },
      {
        "id": 903,
        "x": 9,
        "y": 19,
        "row": 3,
        "angle": 195,
        "type": "foot"
      },
      {
        "id": 904,
        "x": 10,
        "y": 19,
        "row": 3,
        "angle": 10,
        "type": "foot"
      },
      {
        "id": 905,
        "x": 11,
        "y": 19,
        "row": 3,
        "angle": 260,
        "type": "foot"
      },
      {
        "id": 906,
        "x": 12,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 907,
        "x": 13,
        "y": 19,
        "row": 3,
        "angle": 170,
        "type": "foot"
      },
      {
        "id": 908,
        "x": 14,
        "y": 19,
        "row": 3,
        "angle": 270,
        "type": "foot"
      },
      {
        "id": 909,
        "x": 15,
        "y": 19,
        "row": 3,
        "angle": 266,
        "type": "foot"
      },
      {
        "id": 910,
        "x": 16,
        "y": 19,
        "row": 3,
        "angle": 172,
        "type": "foot"
      },
      {
        "id": 911,
        "x": 17,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 912,
        "x": 18,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 913,
        "x": 19,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 914,
        "x": 20,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 915,
        "x": 21,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 916,
        "x": 22,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 917,
        "x": 23,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 918,
        "x": 24,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 919,
        "x": 25,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 920,
        "x": 26,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 921,
        "x": 27,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 922,
        "x": 28,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 923,
        "x": 29,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 924,
        "x": 30,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 925,
        "x": 31,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 926,
        "x": 32,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 927,
        "x": 33,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 928,
        "x": 34,
        "y": 19,
        "row": 3,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 941,
        "x": 0,
        "y": 20,
        "row": 4,
        "angle": 195,
        "type": "foot"
      },
      {
        "id": 942,
        "x": 1,
        "y": 20,
        "row": 4,
        "angle": 162,
        "type": "foot"
      },
      {
        "id": 943,
        "x": 2,
        "y": 20,
        "row": 4,
        "angle": 355,
        "type": "foot"
      },
      {
        "id": 944,
        "x": 3,
        "y": 20,
        "row": 4,
        "angle": 155,
        "type": "foot"
      },
      {
        "id": 945,
        "x": 4,
        "y": 20,
        "row": 4,
        "angle": 180,
        "type": "foot"
      },
      {
        "id": 946,
        "x": 5,
        "y": 20,
        "row": 4,
        "angle": 202,
        "type": "foot"
      },
      {
        "id": 947,
        "x": 6,
        "y": 20,
        "row": 4,
        "angle": 110,
        "type": "foot"
      },
      {
        "id": 948,
        "x": 7,
        "y": 20,
        "row": 4,
        "angle": 357,
        "type": "foot"
      },
      {
        "id": 949,
        "x": 8,
        "y": 20,
        "row": 4,
        "angle": 350,
        "type": "foot"
      },
      {
        "id": 950,
        "x": 9,
        "y": 20,
        "row": 4,
        "angle": 172,
        "type": "foot"
      },
      {
        "id": 951,
        "x": 10,
        "y": 20,
        "row": 4,
        "angle": 180,
        "type": "foot"
      },
      {
        "id": 952,
        "x": 11,
        "y": 20,
        "row": 4,
        "angle": 107,
        "type": "foot"
      },
      {
        "id": 953,
        "x": 12,
        "y": 20,
        "row": 4,
        "angle": 260,
        "type": "foot"
      },
      {
        "id": 954,
        "x": 13,
        "y": 20,
        "row": 4,
        "angle": 195,
        "type": "foot"
      },
      {
        "id": 955,
        "x": 14,
        "y": 20,
        "row": 4,
        "angle": 10,
        "type": "foot"
      },
      {
        "id": 956,
        "x": 15,
        "y": 20,
        "row": 4,
        "angle": 168,
        "type": "foot"
      },
      {
        "id": 957,
        "x": 16,
        "y": 20,
        "row": 4,
        "angle": 175,
        "type": "foot"
      },
      {
        "id": 958,
        "x": 17,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 959,
        "x": 18,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 960,
        "x": 19,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 961,
        "x": 20,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 962,
        "x": 21,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 963,
        "x": 22,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 964,
        "x": 23,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 965,
        "x": 24,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 966,
        "x": 25,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 967,
        "x": 26,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 968,
        "x": 27,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 969,
        "x": 28,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 970,
        "x": 29,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 971,
        "x": 30,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 972,
        "x": 31,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 973,
        "x": 32,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 974,
        "x": 33,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 975,
        "x": 34,
        "y": 20,
        "row": 4,
        "angle": null,
        "type": "foot"
      },
      {
        "id": 988,
        "x": 0,
        "y": 21,
        "row": 5,
        "angle": 175,
        "type": "unknown"
      },
      {
        "id": 989,
        "x": 1,
        "y": 21,
        "row": 5,
        "angle": 165,
        "type": "unknown"
      },
      {
        "id": 990,
        "x": 2,
        "y": 21,
        "row": 5,
        "angle": 200,
        "type": "unknown"
      },
      {
        "id": 991,
        "x": 3,
        "y": 21,
        "row": 5,
        "angle": 195,
        "type": "unknown"
      },
      {
        "id": 992,
        "x": 4,
        "y": 21,
        "row": 5,
        "angle": 255,
        "type": "unknown"
      },
      {
        "id": 993,
        "x": 5,
        "y": 21,
        "row": 5,
        "angle": 225,
        "type": "unknown"
      },
      {
        "id": 994,
        "x": 6,
        "y": 21,
        "row": 5,
        "angle": 50,
        "type": "unknown"
      },
      {
        "id": 995,
        "x": 7,
        "y": 21,
        "row": 5,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 996,
        "x": 8,
        "y": 21,
        "row": 5,
        "angle": 200,
        "type": "unknown"
      },
      {
        "id": 997,
        "x": 9,
        "y": 21,
        "row": 5,
        "angle": 5,
        "type": "unknown"
      },
      {
        "id": 998,
        "x": 10,
        "y": 21,
        "row": 5,
        "angle": 190,
        "type": "unknown"
      },
      {
        "id": 999,
        "x": 11,
        "y": 21,
        "row": 5,
        "angle": 135,
        "type": "unknown"
      },
      {
        "id": 1000,
        "x": 12,
        "y": 21,
        "row": 5,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1001,
        "x": 13,
        "y": 21,
        "row": 5,
        "angle": 150,
        "type": "unknown"
      },
      {
        "id": 1002,
        "x": 14,
        "y": 21,
        "row": 5,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1003,
        "x": 15,
        "y": 21,
        "row": 5,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1004,
        "x": 16,
        "y": 21,
        "row": 5,
        "angle": 225,
        "type": "unknown"
      },
      {
        "id": 1005,
        "x": 17,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1006,
        "x": 18,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1007,
        "x": 19,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1008,
        "x": 20,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1009,
        "x": 21,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1010,
        "x": 22,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1011,
        "x": 23,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1012,
        "x": 24,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1013,
        "x": 25,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1014,
        "x": 26,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1015,
        "x": 27,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1016,
        "x": 28,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1017,
        "x": 29,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1018,
        "x": 30,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1019,
        "x": 31,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1020,
        "x": 32,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1021,
        "x": 33,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1022,
        "x": 34,
        "y": 21,
        "row": 5,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1035,
        "x": 0,
        "y": 22,
        "row": 6,
        "angle": 110,
        "type": "unknown"
      },
      {
        "id": 1036,
        "x": 1,
        "y": 22,
        "row": 6,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1037,
        "x": 2,
        "y": 22,
        "row": 6,
        "angle": 35,
        "type": "unknown"
      },
      {
        "id": 1038,
        "x": 3,
        "y": 22,
        "row": 6,
        "angle": 142,
        "type": "unknown"
      },
      {
        "id": 1039,
        "x": 4,
        "y": 22,
        "row": 6,
        "angle": 355,
        "type": "unknown"
      },
      {
        "id": 1040,
        "x": 5,
        "y": 22,
        "row": 6,
        "angle": 108,
        "type": "unknown"
      },
      {
        "id": 1041,
        "x": 6,
        "y": 22,
        "row": 6,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1042,
        "x": 7,
        "y": 22,
        "row": 6,
        "angle": 260,
        "type": "unknown"
      },
      {
        "id": 1043,
        "x": 8,
        "y": 22,
        "row": 6,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1044,
        "x": 9,
        "y": 22,
        "row": 6,
        "angle": 92,
        "type": "unknown"
      },
      {
        "id": 1045,
        "x": 10,
        "y": 22,
        "row": 6,
        "angle": 328,
        "type": "unknown"
      },
      {
        "id": 1046,
        "x": 11,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1047,
        "x": 12,
        "y": 22,
        "row": 6,
        "angle": 320,
        "type": "unknown"
      },
      {
        "id": 1048,
        "x": 13,
        "y": 22,
        "row": 6,
        "angle": 230,
        "type": "unknown"
      },
      {
        "id": 1049,
        "x": 14,
        "y": 22,
        "row": 6,
        "angle": 308,
        "type": "unknown"
      },
      {
        "id": 1050,
        "x": 15,
        "y": 22,
        "row": 6,
        "angle": 190,
        "type": "unknown"
      },
      {
        "id": 1051,
        "x": 16,
        "y": 22,
        "row": 6,
        "angle": 212,
        "type": "unknown"
      },
      {
        "id": 1052,
        "x": 17,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1053,
        "x": 18,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1054,
        "x": 19,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1055,
        "x": 20,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1056,
        "x": 21,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1057,
        "x": 22,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1058,
        "x": 23,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1059,
        "x": 24,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1060,
        "x": 25,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1061,
        "x": 26,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1062,
        "x": 27,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1063,
        "x": 28,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1064,
        "x": 29,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1065,
        "x": 30,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1066,
        "x": 31,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1067,
        "x": 32,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1068,
        "x": 33,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1069,
        "x": 34,
        "y": 22,
        "row": 6,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1082,
        "x": 0,
        "y": 23,
        "row": 7,
        "angle": 145,
        "type": "unknown"
      },
      {
        "id": 1083,
        "x": 1,
        "y": 23,
        "row": 7,
        "angle": 127,
        "type": "unknown"
      },
      {
        "id": 1084,
        "x": 2,
        "y": 23,
        "row": 7,
        "angle": 182,
        "type": "unknown"
      },
      {
        "id": 1085,
        "x": 3,
        "y": 23,
        "row": 7,
        "angle": 100,
        "type": "unknown"
      },
      {
        "id": 1086,
        "x": 4,
        "y": 23,
        "row": 7,
        "angle": 5,
        "type": "unknown"
      },
      {
        "id": 1087,
        "x": 5,
        "y": 23,
        "row": 7,
        "angle": 225,
        "type": "unknown"
      },
      {
        "id": 1088,
        "x": 6,
        "y": 23,
        "row": 7,
        "angle": 115,
        "type": "unknown"
      },
      {
        "id": 1089,
        "x": 7,
        "y": 23,
        "row": 7,
        "angle": 120,
        "type": "unknown"
      },
      {
        "id": 1090,
        "x": 8,
        "y": 23,
        "row": 7,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1091,
        "x": 9,
        "y": 23,
        "row": 7,
        "angle": 130,
        "type": "unknown"
      },
      {
        "id": 1092,
        "x": 10,
        "y": 23,
        "row": 7,
        "angle": 242,
        "type": "unknown"
      },
      {
        "id": 1093,
        "x": 11,
        "y": 23,
        "row": 7,
        "angle": 235,
        "type": "unknown"
      },
      {
        "id": 1094,
        "x": 12,
        "y": 23,
        "row": 7,
        "angle": 170,
        "type": "unknown"
      },
      {
        "id": 1095,
        "x": 13,
        "y": 23,
        "row": 7,
        "angle": 188,
        "type": "unknown"
      },
      {
        "id": 1096,
        "x": 14,
        "y": 23,
        "row": 7,
        "angle": 172,
        "type": "unknown"
      },
      {
        "id": 1097,
        "x": 15,
        "y": 23,
        "row": 7,
        "angle": 260,
        "type": "unknown"
      },
      {
        "id": 1098,
        "x": 16,
        "y": 23,
        "row": 7,
        "angle": 155,
        "type": "unknown"
      },
      {
        "id": 1099,
        "x": 17,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1100,
        "x": 18,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1101,
        "x": 19,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1102,
        "x": 20,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1103,
        "x": 21,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1104,
        "x": 22,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1105,
        "x": 23,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1106,
        "x": 24,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1107,
        "x": 25,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1108,
        "x": 26,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1109,
        "x": 27,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1110,
        "x": 28,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1111,
        "x": 29,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1112,
        "x": 30,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1113,
        "x": 31,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1114,
        "x": 32,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1115,
        "x": 33,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1116,
        "x": 34,
        "y": 23,
        "row": 7,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1129,
        "x": 0,
        "y": 24,
        "row": 8,
        "angle": 142,
        "type": "unknown"
      },
      {
        "id": 1130,
        "x": 1,
        "y": 24,
        "row": 8,
        "angle": 215,
        "type": "unknown"
      },
      {
        "id": 1131,
        "x": 2,
        "y": 24,
        "row": 8,
        "angle": 2,
        "type": "unknown"
      },
      {
        "id": 1132,
        "x": 3,
        "y": 24,
        "row": 8,
        "angle": 175,
        "type": "unknown"
      },
      {
        "id": 1133,
        "x": 4,
        "y": 24,
        "row": 8,
        "angle": 178,
        "type": "unknown"
      },
      {
        "id": 1134,
        "x": 5,
        "y": 24,
        "row": 8,
        "angle": 212,
        "type": "unknown"
      },
      {
        "id": 1135,
        "x": 6,
        "y": 24,
        "row": 8,
        "angle": 110,
        "type": "unknown"
      },
      {
        "id": 1136,
        "x": 7,
        "y": 24,
        "row": 8,
        "angle": 350,
        "type": "unknown"
      },
      {
        "id": 1137,
        "x": 8,
        "y": 24,
        "row": 8,
        "angle": 2,
        "type": "unknown"
      },
      {
        "id": 1138,
        "x": 9,
        "y": 24,
        "row": 8,
        "angle": 170,
        "type": "unknown"
      },
      {
        "id": 1139,
        "x": 10,
        "y": 24,
        "row": 8,
        "angle": 175,
        "type": "unknown"
      },
      {
        "id": 1140,
        "x": 11,
        "y": 24,
        "row": 8,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1141,
        "x": 12,
        "y": 24,
        "row": 8,
        "angle": 177,
        "type": "unknown"
      },
      {
        "id": 1142,
        "x": 13,
        "y": 24,
        "row": 8,
        "angle": 238,
        "type": "unknown"
      },
      {
        "id": 1143,
        "x": 14,
        "y": 24,
        "row": 8,
        "angle": 240,
        "type": "unknown"
      },
      {
        "id": 1144,
        "x": 15,
        "y": 24,
        "row": 8,
        "angle": 335,
        "type": "unknown"
      },
      {
        "id": 1145,
        "x": 16,
        "y": 24,
        "row": 8,
        "angle": 260,
        "type": "unknown"
      },
      {
        "id": 1146,
        "x": 17,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1147,
        "x": 18,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1148,
        "x": 19,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1149,
        "x": 20,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1150,
        "x": 21,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1151,
        "x": 22,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1152,
        "x": 23,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1153,
        "x": 24,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1154,
        "x": 25,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1155,
        "x": 26,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1156,
        "x": 27,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1157,
        "x": 28,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1158,
        "x": 29,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1159,
        "x": 30,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1160,
        "x": 31,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1161,
        "x": 32,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1162,
        "x": 33,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1163,
        "x": 34,
        "y": 24,
        "row": 8,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1176,
        "x": 0,
        "y": 25,
        "row": 9,
        "angle": 165,
        "type": "unknown"
      },
      {
        "id": 1177,
        "x": 1,
        "y": 25,
        "row": 9,
        "angle": 85,
        "type": "unknown"
      },
      {
        "id": 1178,
        "x": 2,
        "y": 25,
        "row": 9,
        "angle": 222,
        "type": "unknown"
      },
      {
        "id": 1179,
        "x": 3,
        "y": 25,
        "row": 9,
        "angle": 95,
        "type": "unknown"
      },
      {
        "id": 1180,
        "x": 4,
        "y": 25,
        "row": 9,
        "angle": 135,
        "type": "unknown"
      },
      {
        "id": 1181,
        "x": 5,
        "y": 25,
        "row": 9,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1182,
        "x": 6,
        "y": 25,
        "row": 9,
        "angle": 162,
        "type": "unknown"
      },
      {
        "id": 1183,
        "x": 7,
        "y": 25,
        "row": 9,
        "angle": 220,
        "type": "unknown"
      },
      {
        "id": 1184,
        "x": 8,
        "y": 25,
        "row": 9,
        "angle": 177,
        "type": "unknown"
      },
      {
        "id": 1185,
        "x": 9,
        "y": 25,
        "row": 9,
        "angle": 145,
        "type": "unknown"
      },
      {
        "id": 1186,
        "x": 10,
        "y": 25,
        "row": 9,
        "angle": 242,
        "type": "unknown"
      },
      {
        "id": 1187,
        "x": 11,
        "y": 25,
        "row": 9,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1188,
        "x": 12,
        "y": 25,
        "row": 9,
        "angle": 247,
        "type": "unknown"
      },
      {
        "id": 1189,
        "x": 13,
        "y": 25,
        "row": 9,
        "angle": 145,
        "type": "unknown"
      },
      {
        "id": 1190,
        "x": 14,
        "y": 25,
        "row": 9,
        "angle": 220,
        "type": "unknown"
      },
      {
        "id": 1191,
        "x": 15,
        "y": 25,
        "row": 9,
        "angle": 312,
        "type": "unknown"
      },
      {
        "id": 1192,
        "x": 16,
        "y": 25,
        "row": 9,
        "angle": 158,
        "type": "unknown"
      },
      {
        "id": 1193,
        "x": 17,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1194,
        "x": 18,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1195,
        "x": 19,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1196,
        "x": 20,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1197,
        "x": 21,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1198,
        "x": 22,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1199,
        "x": 23,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1200,
        "x": 24,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1201,
        "x": 25,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1202,
        "x": 26,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1203,
        "x": 27,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1204,
        "x": 28,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1205,
        "x": 29,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1206,
        "x": 30,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1207,
        "x": 31,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1208,
        "x": 32,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1209,
        "x": 33,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1210,
        "x": 34,
        "y": 25,
        "row": 9,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1223,
        "x": 0,
        "y": 26,
        "row": 10,
        "angle": 170,
        "type": "unknown"
      },
      {
        "id": 1224,
        "x": 1,
        "y": 26,
        "row": 10,
        "angle": 227,
        "type": "unknown"
      },
      {
        "id": 1225,
        "x": 2,
        "y": 26,
        "row": 10,
        "angle": 347,
        "type": "unknown"
      },
      {
        "id": 1226,
        "x": 3,
        "y": 26,
        "row": 10,
        "angle": 240,
        "type": "unknown"
      },
      {
        "id": 1227,
        "x": 4,
        "y": 26,
        "row": 10,
        "angle": 130,
        "type": "unknown"
      },
      {
        "id": 1228,
        "x": 5,
        "y": 26,
        "row": 10,
        "angle": 132,
        "type": "unknown"
      },
      {
        "id": 1229,
        "x": 6,
        "y": 26,
        "row": 10,
        "angle": 205,
        "type": "unknown"
      },
      {
        "id": 1230,
        "x": 7,
        "y": 26,
        "row": 10,
        "angle": 202,
        "type": "unknown"
      },
      {
        "id": 1231,
        "x": 8,
        "y": 26,
        "row": 10,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1232,
        "x": 9,
        "y": 26,
        "row": 10,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1233,
        "x": 10,
        "y": 26,
        "row": 10,
        "angle": 215,
        "type": "unknown"
      },
      {
        "id": 1234,
        "x": 11,
        "y": 26,
        "row": 10,
        "angle": 332,
        "type": "unknown"
      },
      {
        "id": 1235,
        "x": 12,
        "y": 26,
        "row": 10,
        "angle": 135,
        "type": "unknown"
      },
      {
        "id": 1236,
        "x": 13,
        "y": 26,
        "row": 10,
        "angle": 250,
        "type": "unknown"
      },
      {
        "id": 1237,
        "x": 14,
        "y": 26,
        "row": 10,
        "angle": 160,
        "type": "unknown"
      },
      {
        "id": 1238,
        "x": 15,
        "y": 26,
        "row": 10,
        "angle": 215,
        "type": "unknown"
      },
      {
        "id": 1239,
        "x": 16,
        "y": 26,
        "row": 10,
        "angle": 197,
        "type": "unknown"
      },
      {
        "id": 1240,
        "x": 17,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1241,
        "x": 18,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1242,
        "x": 19,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1243,
        "x": 20,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1244,
        "x": 21,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1245,
        "x": 22,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1246,
        "x": 23,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1247,
        "x": 24,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1248,
        "x": 25,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1249,
        "x": 26,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1250,
        "x": 27,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1251,
        "x": 28,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1252,
        "x": 29,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1253,
        "x": 30,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1254,
        "x": 31,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1255,
        "x": 32,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1256,
        "x": 33,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1257,
        "x": 34,
        "y": 26,
        "row": 10,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1270,
        "x": 0,
        "y": 27,
        "row": 11,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1271,
        "x": 1,
        "y": 27,
        "row": 11,
        "angle": 140,
        "type": "unknown"
      },
      {
        "id": 1272,
        "x": 2,
        "y": 27,
        "row": 11,
        "angle": 155,
        "type": "unknown"
      },
      {
        "id": 1273,
        "x": 3,
        "y": 27,
        "row": 11,
        "angle": 150,
        "type": "unknown"
      },
      {
        "id": 1274,
        "x": 4,
        "y": 27,
        "row": 11,
        "angle": 20,
        "type": "unknown"
      },
      {
        "id": 1275,
        "x": 5,
        "y": 27,
        "row": 11,
        "angle": 210,
        "type": "unknown"
      },
      {
        "id": 1276,
        "x": 6,
        "y": 27,
        "row": 11,
        "angle": 140,
        "type": "unknown"
      },
      {
        "id": 1277,
        "x": 7,
        "y": 27,
        "row": 11,
        "angle": 175,
        "type": "unknown"
      },
      {
        "id": 1278,
        "x": 8,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1279,
        "x": 9,
        "y": 27,
        "row": 11,
        "angle": 203,
        "type": "unknown"
      },
      {
        "id": 1280,
        "x": 10,
        "y": 27,
        "row": 11,
        "angle": 100,
        "type": "unknown"
      },
      {
        "id": 1281,
        "x": 11,
        "y": 27,
        "row": 11,
        "angle": 168,
        "type": "unknown"
      },
      {
        "id": 1282,
        "x": 12,
        "y": 27,
        "row": 11,
        "angle": 310,
        "type": "unknown"
      },
      {
        "id": 1283,
        "x": 13,
        "y": 27,
        "row": 11,
        "angle": 230,
        "type": "unknown"
      },
      {
        "id": 1284,
        "x": 14,
        "y": 27,
        "row": 11,
        "angle": 105,
        "type": "unknown"
      },
      {
        "id": 1285,
        "x": 15,
        "y": 27,
        "row": 11,
        "angle": 177,
        "type": "unknown"
      },
      {
        "id": 1286,
        "x": 16,
        "y": 27,
        "row": 11,
        "angle": 262,
        "type": "unknown"
      },
      {
        "id": 1287,
        "x": 17,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1288,
        "x": 18,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1289,
        "x": 19,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1290,
        "x": 20,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1291,
        "x": 21,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1292,
        "x": 22,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1293,
        "x": 23,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1294,
        "x": 24,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1295,
        "x": 25,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1296,
        "x": 26,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1297,
        "x": 27,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1298,
        "x": 28,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1299,
        "x": 29,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1300,
        "x": 30,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1301,
        "x": 31,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1302,
        "x": 32,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1303,
        "x": 33,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1304,
        "x": 34,
        "y": 27,
        "row": 11,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1317,
        "x": 0,
        "y": 28,
        "row": 12,
        "angle": 145,
        "type": "unknown"
      },
      {
        "id": 1318,
        "x": 1,
        "y": 28,
        "row": 12,
        "angle": 210,
        "type": "unknown"
      },
      {
        "id": 1319,
        "x": 2,
        "y": 28,
        "row": 12,
        "angle": 55,
        "type": "unknown"
      },
      {
        "id": 1320,
        "x": 3,
        "y": 28,
        "row": 12,
        "angle": 90,
        "type": "unknown"
      },
      {
        "id": 1321,
        "x": 4,
        "y": 28,
        "row": 12,
        "angle": 240,
        "type": "unknown"
      },
      {
        "id": 1322,
        "x": 5,
        "y": 28,
        "row": 12,
        "angle": 182,
        "type": "unknown"
      },
      {
        "id": 1323,
        "x": 6,
        "y": 28,
        "row": 12,
        "angle": 198,
        "type": "unknown"
      },
      {
        "id": 1324,
        "x": 7,
        "y": 28,
        "row": 12,
        "angle": 128,
        "type": "unknown"
      },
      {
        "id": 1325,
        "x": 8,
        "y": 28,
        "row": 12,
        "angle": 355,
        "type": "unknown"
      },
      {
        "id": 1326,
        "x": 9,
        "y": 28,
        "row": 12,
        "angle": 165,
        "type": "unknown"
      },
      {
        "id": 1327,
        "x": 10,
        "y": 28,
        "row": 12,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1328,
        "x": 11,
        "y": 28,
        "row": 12,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1329,
        "x": 12,
        "y": 28,
        "row": 12,
        "angle": 145,
        "type": "unknown"
      },
      {
        "id": 1330,
        "x": 13,
        "y": 28,
        "row": 12,
        "angle": 250,
        "type": "unknown"
      },
      {
        "id": 1331,
        "x": 14,
        "y": 28,
        "row": 12,
        "angle": 152,
        "type": "unknown"
      },
      {
        "id": 1332,
        "x": 15,
        "y": 28,
        "row": 12,
        "angle": 330,
        "type": "unknown"
      },
      {
        "id": 1333,
        "x": 16,
        "y": 28,
        "row": 12,
        "angle": 210,
        "type": "unknown"
      },
      {
        "id": 1334,
        "x": 17,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1335,
        "x": 18,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1336,
        "x": 19,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1337,
        "x": 20,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1338,
        "x": 21,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1339,
        "x": 22,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1340,
        "x": 23,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1341,
        "x": 24,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1342,
        "x": 25,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1343,
        "x": 26,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1344,
        "x": 27,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1345,
        "x": 28,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1346,
        "x": 29,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1347,
        "x": 30,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1348,
        "x": 31,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1349,
        "x": 32,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1350,
        "x": 33,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1351,
        "x": 34,
        "y": 28,
        "row": 12,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1364,
        "x": 0,
        "y": 29,
        "row": 13,
        "angle": 152,
        "type": "unknown"
      },
      {
        "id": 1365,
        "x": 1,
        "y": 29,
        "row": 13,
        "angle": 8,
        "type": "unknown"
      },
      {
        "id": 1366,
        "x": 2,
        "y": 29,
        "row": 13,
        "angle": 120,
        "type": "unknown"
      },
      {
        "id": 1367,
        "x": 3,
        "y": 29,
        "row": 13,
        "angle": 178,
        "type": "unknown"
      },
      {
        "id": 1368,
        "x": 4,
        "y": 29,
        "row": 13,
        "angle": 155,
        "type": "unknown"
      },
      {
        "id": 1369,
        "x": 5,
        "y": 29,
        "row": 13,
        "angle": 120,
        "type": "unknown"
      },
      {
        "id": 1370,
        "x": 6,
        "y": 29,
        "row": 13,
        "angle": 205,
        "type": "unknown"
      },
      {
        "id": 1371,
        "x": 7,
        "y": 29,
        "row": 13,
        "angle": 135,
        "type": "unknown"
      },
      {
        "id": 1372,
        "x": 8,
        "y": 29,
        "row": 13,
        "angle": 188,
        "type": "unknown"
      },
      {
        "id": 1373,
        "x": 9,
        "y": 29,
        "row": 13,
        "angle": 190,
        "type": "unknown"
      },
      {
        "id": 1374,
        "x": 10,
        "y": 29,
        "row": 13,
        "angle": 320,
        "type": "unknown"
      },
      {
        "id": 1375,
        "x": 11,
        "y": 29,
        "row": 13,
        "angle": 150,
        "type": "unknown"
      },
      {
        "id": 1376,
        "x": 12,
        "y": 29,
        "row": 13,
        "angle": 175,
        "type": "unknown"
      },
      {
        "id": 1377,
        "x": 13,
        "y": 29,
        "row": 13,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1378,
        "x": 14,
        "y": 29,
        "row": 13,
        "angle": 160,
        "type": "unknown"
      },
      {
        "id": 1379,
        "x": 15,
        "y": 29,
        "row": 13,
        "angle": 188,
        "type": "unknown"
      },
      {
        "id": 1380,
        "x": 16,
        "y": 29,
        "row": 13,
        "angle": 160,
        "type": "unknown"
      },
      {
        "id": 1381,
        "x": 17,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1382,
        "x": 18,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1383,
        "x": 19,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1384,
        "x": 20,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1385,
        "x": 21,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1386,
        "x": 22,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1387,
        "x": 23,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1388,
        "x": 24,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1389,
        "x": 25,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1390,
        "x": 26,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1391,
        "x": 27,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1392,
        "x": 28,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1393,
        "x": 29,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1394,
        "x": 30,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1395,
        "x": 31,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1396,
        "x": 32,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1397,
        "x": 33,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1398,
        "x": 34,
        "y": 29,
        "row": 13,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1411,
        "x": 0,
        "y": 30,
        "row": 14,
        "angle": 135,
        "type": "unknown"
      },
      {
        "id": 1412,
        "x": 1,
        "y": 30,
        "row": 14,
        "angle": 235,
        "type": "unknown"
      },
      {
        "id": 1413,
        "x": 2,
        "y": 30,
        "row": 14,
        "angle": 177,
        "type": "unknown"
      },
      {
        "id": 1414,
        "x": 3,
        "y": 30,
        "row": 14,
        "angle": 115,
        "type": "unknown"
      },
      {
        "id": 1415,
        "x": 4,
        "y": 30,
        "row": 14,
        "angle": 117,
        "type": "unknown"
      },
      {
        "id": 1416,
        "x": 5,
        "y": 30,
        "row": 14,
        "angle": 195,
        "type": "unknown"
      },
      {
        "id": 1417,
        "x": 6,
        "y": 30,
        "row": 14,
        "angle": 178,
        "type": "unknown"
      },
      {
        "id": 1418,
        "x": 7,
        "y": 30,
        "row": 14,
        "angle": 240,
        "type": "unknown"
      },
      {
        "id": 1419,
        "x": 8,
        "y": 30,
        "row": 14,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1420,
        "x": 9,
        "y": 30,
        "row": 14,
        "angle": 130,
        "type": "unknown"
      },
      {
        "id": 1421,
        "x": 10,
        "y": 30,
        "row": 14,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1422,
        "x": 11,
        "y": 30,
        "row": 14,
        "angle": 218,
        "type": "unknown"
      },
      {
        "id": 1423,
        "x": 12,
        "y": 30,
        "row": 14,
        "angle": 248,
        "type": "unknown"
      },
      {
        "id": 1424,
        "x": 13,
        "y": 30,
        "row": 14,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1425,
        "x": 14,
        "y": 30,
        "row": 14,
        "angle": 305,
        "type": "unknown"
      },
      {
        "id": 1426,
        "x": 15,
        "y": 30,
        "row": 14,
        "angle": 250,
        "type": "unknown"
      },
      {
        "id": 1427,
        "x": 16,
        "y": 30,
        "row": 14,
        "angle": 182,
        "type": "unknown"
      },
      {
        "id": 1428,
        "x": 17,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1429,
        "x": 18,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1430,
        "x": 19,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1431,
        "x": 20,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1432,
        "x": 21,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1433,
        "x": 22,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1434,
        "x": 23,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1435,
        "x": 24,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1436,
        "x": 25,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1437,
        "x": 26,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1438,
        "x": 27,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1439,
        "x": 28,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1440,
        "x": 29,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1441,
        "x": 30,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1442,
        "x": 31,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1443,
        "x": 32,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1444,
        "x": 33,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1445,
        "x": 34,
        "y": 30,
        "row": 14,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1458,
        "x": 0,
        "y": 31,
        "row": 15,
        "angle": 185,
        "type": "unknown"
      },
      {
        "id": 1459,
        "x": 1,
        "y": 31,
        "row": 15,
        "angle": 92,
        "type": "unknown"
      },
      {
        "id": 1460,
        "x": 2,
        "y": 31,
        "row": 15,
        "angle": 232,
        "type": "unknown"
      },
      {
        "id": 1461,
        "x": 3,
        "y": 31,
        "row": 15,
        "angle": 125,
        "type": "unknown"
      },
      {
        "id": 1462,
        "x": 4,
        "y": 31,
        "row": 15,
        "angle": 2,
        "type": "unknown"
      },
      {
        "id": 1463,
        "x": 5,
        "y": 31,
        "row": 15,
        "angle": 178,
        "type": "unknown"
      },
      {
        "id": 1464,
        "x": 6,
        "y": 31,
        "row": 15,
        "angle": 120,
        "type": "unknown"
      },
      {
        "id": 1465,
        "x": 7,
        "y": 31,
        "row": 15,
        "angle": 250,
        "type": "unknown"
      },
      {
        "id": 1466,
        "x": 8,
        "y": 31,
        "row": 15,
        "angle": 180,
        "type": "unknown"
      },
      {
        "id": 1467,
        "x": 9,
        "y": 31,
        "row": 15,
        "angle": 160,
        "type": "unknown"
      },
      {
        "id": 1468,
        "x": 10,
        "y": 31,
        "row": 15,
        "angle": 240,
        "type": "unknown"
      },
      {
        "id": 1469,
        "x": 11,
        "y": 31,
        "row": 15,
        "angle": 165,
        "type": "unknown"
      },
      {
        "id": 1470,
        "x": 12,
        "y": 31,
        "row": 15,
        "angle": 105,
        "type": "unknown"
      },
      {
        "id": 1471,
        "x": 13,
        "y": 31,
        "row": 15,
        "angle": 158,
        "type": "unknown"
      },
      {
        "id": 1472,
        "x": 14,
        "y": 31,
        "row": 15,
        "angle": 132,
        "type": "unknown"
      },
      {
        "id": 1473,
        "x": 15,
        "y": 31,
        "row": 15,
        "angle": 150,
        "type": "unknown"
      },
      {
        "id": 1474,
        "x": 16,
        "y": 31,
        "row": 15,
        "angle": 157,
        "type": "unknown"
      },
      {
        "id": 1475,
        "x": 17,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1476,
        "x": 18,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1477,
        "x": 19,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1478,
        "x": 20,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1479,
        "x": 21,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1480,
        "x": 22,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1481,
        "x": 23,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1482,
        "x": 24,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1483,
        "x": 25,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1484,
        "x": 26,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1485,
        "x": 27,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1486,
        "x": 28,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1487,
        "x": 29,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1488,
        "x": 30,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1489,
        "x": 31,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1490,
        "x": 32,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1491,
        "x": 33,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1492,
        "x": 34,
        "y": 31,
        "row": 15,
        "angle": null,
        "type": "unknown"
      },
      {
        "id": 1505,
        "x": 0,
        "y": 32,
        "row": 16,
        "angle": 225,
        "type": "hand"
      },
      {
        "id": 1506,
        "x": 1,
        "y": 32,
        "row": 16,
        "angle": 195,
        "type": "hand"
      },
      {
        "id": 1507,
        "x": 2,
        "y": 32,
        "row": 16,
        "angle": 195,
        "type": "hand"
      },
      {
        "id": 1508,
        "x": 3,
        "y": 32,
        "row": 16,
        "angle": 215,
        "type": "hand"
      },
      {
        "id": 1509,
        "x": 4,
        "y": 32,
        "row": 16,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1510,
        "x": 5,
        "y": 32,
        "row": 16,
        "angle": 160,
        "type": "hand"
      },
      {
        "id": 1511,
        "x": 6,
        "y": 32,
        "row": 16,
        "angle": 200,
        "type": "hand"
      },
      {
        "id": 1512,
        "x": 7,
        "y": 32,
        "row": 16,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1513,
        "x": 8,
        "y": 32,
        "row": 16,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1514,
        "x": 9,
        "y": 32,
        "row": 16,
        "angle": 262,
        "type": "hand"
      },
      {
        "id": 1515,
        "x": 10,
        "y": 32,
        "row": 16,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1516,
        "x": 11,
        "y": 32,
        "row": 16,
        "angle": 198,
        "type": "hand"
      },
      {
        "id": 1517,
        "x": 12,
        "y": 32,
        "row": 16,
        "angle": 330,
        "type": "hand"
      },
      {
        "id": 1518,
        "x": 13,
        "y": 32,
        "row": 16,
        "angle": 240,
        "type": "hand"
      },
      {
        "id": 1519,
        "x": 14,
        "y": 32,
        "row": 16,
        "angle": 178,
        "type": "hand"
      },
      {
        "id": 1520,
        "x": 15,
        "y": 32,
        "row": 16,
        "angle": 238,
        "type": "hand"
      },
      {
        "id": 1521,
        "x": 16,
        "y": 32,
        "row": 16,
        "angle": 140,
        "type": "hand"
      },
      {
        "id": 1522,
        "x": 17,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1523,
        "x": 18,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1524,
        "x": 19,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1525,
        "x": 20,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1526,
        "x": 21,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1527,
        "x": 22,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1528,
        "x": 23,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1529,
        "x": 24,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1530,
        "x": 25,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1531,
        "x": 26,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1532,
        "x": 27,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1533,
        "x": 28,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1534,
        "x": 29,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1535,
        "x": 30,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1536,
        "x": 31,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1537,
        "x": 32,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1538,
        "x": 33,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1539,
        "x": 34,
        "y": 32,
        "row": 16,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1552,
        "x": 0,
        "y": 33,
        "row": 17,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1553,
        "x": 1,
        "y": 33,
        "row": 17,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1554,
        "x": 2,
        "y": 33,
        "row": 17,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1555,
        "x": 3,
        "y": 33,
        "row": 17,
        "angle": 130,
        "type": "hand"
      },
      {
        "id": 1556,
        "x": 4,
        "y": 33,
        "row": 17,
        "angle": 205,
        "type": "hand"
      },
      {
        "id": 1557,
        "x": 5,
        "y": 33,
        "row": 17,
        "angle": 177,
        "type": "hand"
      },
      {
        "id": 1558,
        "x": 6,
        "y": 33,
        "row": 17,
        "angle": 130,
        "type": "hand"
      },
      {
        "id": 1559,
        "x": 7,
        "y": 33,
        "row": 17,
        "angle": 182,
        "type": "hand"
      },
      {
        "id": 1560,
        "x": 8,
        "y": 33,
        "row": 17,
        "angle": 187,
        "type": "hand"
      },
      {
        "id": 1561,
        "x": 9,
        "y": 33,
        "row": 17,
        "angle": 142,
        "type": "hand"
      },
      {
        "id": 1562,
        "x": 10,
        "y": 33,
        "row": 17,
        "angle": 175,
        "type": "hand"
      },
      {
        "id": 1563,
        "x": 11,
        "y": 33,
        "row": 17,
        "angle": 222,
        "type": "hand"
      },
      {
        "id": 1564,
        "x": 12,
        "y": 33,
        "row": 17,
        "angle": 135,
        "type": "hand"
      },
      {
        "id": 1565,
        "x": 13,
        "y": 33,
        "row": 17,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1566,
        "x": 14,
        "y": 33,
        "row": 17,
        "angle": 248,
        "type": "hand"
      },
      {
        "id": 1567,
        "x": 15,
        "y": 33,
        "row": 17,
        "angle": 190,
        "type": "hand"
      },
      {
        "id": 1568,
        "x": 16,
        "y": 33,
        "row": 17,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1569,
        "x": 17,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1570,
        "x": 18,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1571,
        "x": 19,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1572,
        "x": 20,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1573,
        "x": 21,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1574,
        "x": 22,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1575,
        "x": 23,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1576,
        "x": 24,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1577,
        "x": 25,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1578,
        "x": 26,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1579,
        "x": 27,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1580,
        "x": 28,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1581,
        "x": 29,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1582,
        "x": 30,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1583,
        "x": 31,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1584,
        "x": 32,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1585,
        "x": 33,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1586,
        "x": 34,
        "y": 33,
        "row": 17,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1599,
        "x": 0,
        "y": 34,
        "row": 18,
        "angle": 255,
        "type": "hand"
      },
      {
        "id": 1600,
        "x": 1,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1601,
        "x": 2,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1602,
        "x": 3,
        "y": 34,
        "row": 18,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1603,
        "x": 4,
        "y": 34,
        "row": 18,
        "angle": 225,
        "type": "hand"
      },
      {
        "id": 1604,
        "x": 5,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1605,
        "x": 6,
        "y": 34,
        "row": 18,
        "angle": 130,
        "type": "hand"
      },
      {
        "id": 1606,
        "x": 7,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1607,
        "x": 8,
        "y": 34,
        "row": 18,
        "angle": 147,
        "type": "hand"
      },
      {
        "id": 1608,
        "x": 9,
        "y": 34,
        "row": 18,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1609,
        "x": 10,
        "y": 34,
        "row": 18,
        "angle": 240,
        "type": "hand"
      },
      {
        "id": 1610,
        "x": 11,
        "y": 34,
        "row": 18,
        "angle": 185,
        "type": "hand"
      },
      {
        "id": 1611,
        "x": 12,
        "y": 34,
        "row": 18,
        "angle": 110,
        "type": "hand"
      },
      {
        "id": 1612,
        "x": 13,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1613,
        "x": 14,
        "y": 34,
        "row": 18,
        "angle": 180,
        "type": "hand"
      },
      {
        "id": 1614,
        "x": 15,
        "y": 34,
        "row": 18,
        "angle": 175,
        "type": "hand"
      },
      {
        "id": 1615,
        "x": 16,
        "y": 34,
        "row": 18,
        "angle": 105,
        "type": "hand"
      },
      {
        "id": 1616,
        "x": 17,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1617,
        "x": 18,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1618,
        "x": 19,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1619,
        "x": 20,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1620,
        "x": 21,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1621,
        "x": 22,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1622,
        "x": 23,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1623,
        "x": 24,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1624,
        "x": 25,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1625,
        "x": 26,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1626,
        "x": 27,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1627,
        "x": 28,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1628,
        "x": 29,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1629,
        "x": 30,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1630,
        "x": 31,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1631,
        "x": 32,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1632,
        "x": 33,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      },
      {
        "id": 1633,
        "x": 34,
        "y": 34,
        "row": 18,
        "angle": null,
        "type": "hand"
      }
    ]
  }
}