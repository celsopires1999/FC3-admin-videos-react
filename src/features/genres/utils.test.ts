import { mapGenrePayload } from "./utils";
import { mockGenre } from "./mocks";

describe("Utils Unit Test", () => {
  it("should map genre to payload", () => {
    const payload = mapGenrePayload(mockGenre.data);

    expect(payload).toEqual({
      id: "f288d0f4-1a6b-42bc-9252-7fcc3b3e94aa",
      name: "Terror",
      categories_id: [
        "07bcf27a-838e-4a05-a8a3-4c7182b9ec81",
        "141f06f0-0dc5-4657-b73a-7ca63b93160c",
        "18c7f8bf-a626-4b36-867f-6fb957aab558",
        "23cc2fad-dd53-45c4-8561-e7e6219b2906",
        "2d757c67-8d72-4fdc-b5a3-7bbc86ccde5e",
      ],
    });
  });
});
