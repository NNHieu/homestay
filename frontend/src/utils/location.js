import axios from 'axios'

// Call autocomplete location HERE api với input text  
export function autoCompleteLocation(text, success, errHandler) {
   axios
      .get("https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json",
         {
            params: {
               apiKey: 'BA9lq866SwA-ewV-HhDsKdmwqDLrHTYaoCmU4IaHw90',
               query: text, f: 'json', country: 'VNM',
               beginHighlight: '#', endHighlight: '#',
               language: 'vi'
            }
         })
      .then(res => success(res.data))
      .catch(err => {
         if (errHandler)
            errHandler(err.data)
      })
}

// Call detail about location HERE api với input text  
export function detailLocation(locationId, success, errHandler) {
   axios
      .get('https://geocoder.ls.hereapi.com/6.2/geocode.json',
         {
            params: {
               locationId: locationId,
               jsonattributes: '1',
               gen: '9',
               apiKey: 'BA9lq866SwA-ewV-HhDsKdmwqDLrHTYaoCmU4IaHw90'
            }
         }
      )
      .then(res => success(res.data))
      .catch(err => {
         if (errHandler)
            errHandler(err.data)
      })
}

// Prepare location info object.
var locationInfo = {
   geo: null,
   country: null,
   state: null,
   city: null,
   postalCode: null,
   street: null,
   streetNumber: null,
   reset: function () {
      this.geo = null;
      this.country = null;
      this.state = null;
      this.city = null;
      this.postalCode = null;
      this.street = null;
      this.streetNumber = null;
   }
};

export const testOutputGoogleAutoComplete = `{
    "predictions" : [
       {
          "description" : "Hanoi National Cancer Hospital K3, Cầu Bươu, Tân Triều, Thanh Trì, Hanoi, Vietnam",
          "id" : "f595682fb564e3b765c7a8d96f4fc089d73c7349",
          "matched_substrings" : [
             {
                "length" : 5,
                "offset" : 0
             }
          ],
          "place_id" : "ChIJcSHvJyetNTER0maKj6qdzB8",
          "reference" : "ChIJcSHvJyetNTER0maKj6qdzB8",
          "structured_formatting" : {
             "main_text" : "Hanoi National Cancer Hospital K3",
             "main_text_matched_substrings" : [
                {
                   "length" : 5,
                   "offset" : 0
                }
             ],
             "secondary_text" : "Cầu Bươu, Tân Triều, Thanh Trì, Hanoi, Vietnam"
          },
          "terms" : [
             {
                "offset" : 0,
                "value" : "Hanoi National Cancer Hospital K3"
             },
             {
                "offset" : 35,
                "value" : "Cầu Bươu"
             },
             {
                "offset" : 45,
                "value" : "Tân Triều"
             },
             {
                "offset" : 56,
                "value" : "Thanh Trì"
             },
             {
                "offset" : 67,
                "value" : "Hanoi"
             },
             {
                "offset" : 74,
                "value" : "Vietnam"
             }
          ],
          "types" : [ "health", "establishment" ]
       },
       {
          "description" : "Hanoi University of Business and Technology, Ngõ 124 Phố Vĩnh Tuy, Vinh Tuy, Hai Bà Trưng District, Hanoi, Vietnam",
          "id" : "3b2ede20c166b96e306df3acd2070219122de8bb",
          "matched_substrings" : [
             {
                "length" : 5,
                "offset" : 0
             }
          ],
          "place_id" : "ChIJgVvDF6quNTER3PgGL8--2Hk",
          "reference" : "ChIJgVvDF6quNTER3PgGL8--2Hk",
          "structured_formatting" : {
             "main_text" : "Hanoi University of Business and Technology",
             "main_text_matched_substrings" : [
                {
                   "length" : 5,
                   "offset" : 0
                }
             ],
             "secondary_text" : "Ngõ 124 Phố Vĩnh Tuy, Vinh Tuy, Hai Bà Trưng District, Hanoi, Vietnam"
          },
          "terms" : [
             {
                "offset" : 0,
                "value" : "Hanoi University of Business and Technology"
             },
             {
                "offset" : 45,
                "value" : "Ngõ 124 Phố Vĩnh Tuy"
             },
             {
                "offset" : 67,
                "value" : "Vinh Tuy"
             },
             {
                "offset" : 77,
                "value" : "Hai Bà Trưng District"
             },
             {
                "offset" : 100,
                "value" : "Hanoi"
             },
             {
                "offset" : 107,
                "value" : "Vietnam"
             }
          ],
          "types" : [ "university", "point_of_interest", "establishment" ]
       },
       {
          "description" : "Hanoi Hotel, Trần Huy Liệu, Giang Vo, Ba Đình, Hanoi, Vietnam",
          "id" : "03e725b800683d101ec5e3c00dbe1e54b7d56222",
          "matched_substrings" : [
             {
                "length" : 5,
                "offset" : 0
             }
          ],
          "place_id" : "ChIJjbhqO3SrNTER1l3vLb6MhPs",
          "reference" : "ChIJjbhqO3SrNTER1l3vLb6MhPs",
          "structured_formatting" : {
             "main_text" : "Hanoi Hotel",
             "main_text_matched_substrings" : [
                {
                   "length" : 5,
                   "offset" : 0
                }
             ],
             "secondary_text" : "Trần Huy Liệu, Giang Vo, Ba Đình, Hanoi, Vietnam"
          },
          "terms" : [
             {
                "offset" : 0,
                "value" : "Hanoi Hotel"
             },
             {
                "offset" : 13,
                "value" : "Trần Huy Liệu"
             },
             {
                "offset" : 28,
                "value" : "Giang Vo"
             },
             {
                "offset" : 38,
                "value" : "Ba Đình"
             },
             {
                "offset" : 47,
                "value" : "Hanoi"
             },
             {
                "offset" : 54,
                "value" : "Vietnam"
             }
          ],
          "types" : [ "lodging", "point_of_interest", "establishment" ]
       },
       {
          "description" : "Hanoi French Hospital, Phương Mai, Phuong Mai, Đống Đa, Hanoi, Vietnam",
          "id" : "3ea80ba85d04390c09cc490ac07aff4010453b08",
          "matched_substrings" : [
             {
                "length" : 5,
                "offset" : 0
             }
          ],
          "place_id" : "ChIJ0eR74XmsNTERtumOeSyIXcE",
          "reference" : "ChIJ0eR74XmsNTERtumOeSyIXcE",
          "structured_formatting" : {
             "main_text" : "Hanoi French Hospital",
             "main_text_matched_substrings" : [
                {
                   "length" : 5,
                   "offset" : 0
                }
             ],
             "secondary_text" : "Phương Mai, Phuong Mai, Đống Đa, Hanoi, Vietnam"
          },
          "terms" : [
             {
                "offset" : 0,
                "value" : "Hanoi French Hospital"
             },
             {
                "offset" : 23,
                "value" : "Phương Mai"
             },
             {
                "offset" : 35,
                "value" : "Phuong Mai"
             },
             {
                "offset" : 47,
                "value" : "Đống Đa"
             },
             {
                "offset" : 56,
                "value" : "Hanoi"
             },
             {
                "offset" : 63,
                "value" : "Vietnam"
             }
          ],
          "types" : [ "hospital", "health", "point_of_interest", "establishment" ]
       },
       {
          "description" : "Hanoi Daewoo Hotel, Kim Mã, Ngọc Khánh, Ba Đình, Hanoi, Vietnam",
          "id" : "551f420c2dcac2aef7444eed614c9585a7639e7e",
          "matched_substrings" : [
             {
                "length" : 5,
                "offset" : 0
             }
          ],
          "place_id" : "ChIJ06cj-WmrNTERHbuOiutGSAw",
          "reference" : "ChIJ06cj-WmrNTERHbuOiutGSAw",
          "structured_formatting" : {
             "main_text" : "Hanoi Daewoo Hotel",
             "main_text_matched_substrings" : [
                {
                   "length" : 5,
                   "offset" : 0
                }
             ],
             "secondary_text" : "Kim Mã, Ngọc Khánh, Ba Đình, Hanoi, Vietnam"
          },
          "terms" : [
             {
                "offset" : 0,
                "value" : "Hanoi Daewoo Hotel"
             },
             {
                "offset" : 20,
                "value" : "Kim Mã"
             },
             {
                "offset" : 28,
                "value" : "Ngọc Khánh"
             },
             {
                "offset" : 40,
                "value" : "Ba Đình"
             },
             {
                "offset" : 49,
                "value" : "Hanoi"
             },
             {
                "offset" : 56,
                "value" : "Vietnam"
             }
          ],
          "types" : [ "lodging", "point_of_interest", "establishment" ]
       }
    ],
    "status" : "OK"
 }
 `