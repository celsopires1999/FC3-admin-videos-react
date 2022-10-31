import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genre";
import { GenreForm } from "./components/GenreForm";
import { initialState, useCreateGenreMutation } from "./GenreSlice";

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre(genreState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre created successfully`, {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar(`Genre not created`, { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>
        {/* Form */}
        <GenreForm
          genre={genreState}
          categories={categories.data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};

const genre = {
  id: "",
  name: "",
  is_active: false,
  description: null,
  created_at: "",
  updated_at: "",
  deleted_at: null,
};

const categories = {
  data: [
    {
      id: "06fe24ca-71cc-4d55-9a64-82f953501b34",
      name: "Docker",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-09-30 14:34:13",
      updated_at: "2022-09-30 14:34:13",
    },
    {
      id: "07bcf27a-838e-4a05-a8a3-4c7182b9ec81",
      name: "Navy",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "0825e686-1ff8-4bcd-b55a-7eb3677d16e7",
      name: "SeaGreen",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "127bce63-672d-4b1a-8dcd-a8eda7270421",
      name: "SeaGreen",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "141f06f0-0dc5-4657-b73a-7ca63b93160c",
      name: "DarkOliveGreen",
      description: "Architecto iusto natus et quisquam tempora.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "145bfd30-10a4-419a-8b3f-cb5fc2795610",
      name: "OrangeRed",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "18c7f8bf-a626-4b36-867f-6fb957aab558",
      name: "LimeGreen",
      description: "Iure quas illo laborum accusantium amet quibusdam quo.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "1a735218-7e5b-499f-8aee-6b34ce5bcfd5",
      name: "NavajoWhite",
      description: "Ea quo ducimus voluptatem quo.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "1b86aa88-1efd-4d16-aacc-a15c93177b32",
      name: "DarkMagenta",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "1eccb720-92d8-4cef-b189-45a6e9e13fa1",
      name: "Gray",
      description: "Placeat reiciendis a saepe officia officia.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "2016d454-dae0-4649-b4e0-61818136156b",
      name: "MidnightBlue",
      description: "Nostrum voluptatem qui adipisci.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "20264148-1af2-439d-9223-a0bb891c3610",
      name: "Chocolate",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "21002278-092b-4dd3-b816-aa3fa882328e",
      name: "Khaki",
      description: "Incidunt dolore voluptatem commodi.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "224440a8-a745-4b74-971e-db3135c835cb",
      name: "SkyBlue",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "23cc2fad-dd53-45c4-8561-e7e6219b2906",
      name: "Darkorange",
      description: "Odit omnis qui sit eaque atque et in.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "260926c6-4e76-40e0-9170-b9907f0d37b0",
      name: "LightSlateGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "268e4751-2de4-4dda-b1b0-6863a569281b",
      name: "LightGoldenRodYellow",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "2714af03-7794-4423-820e-33947e6625cd",
      name: "Plum",
      description: "Omnis corporis rem id eius porro molestiae.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "28787580-d81d-426f-8e99-0d7422db20d8",
      name: "MistyRose",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "2d757c67-8d72-4fdc-b5a3-7bbc86ccde5e",
      name: "LightSeaGreen",
      description: "Molestiae qui sunt qui modi quibusdam maiores.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "2f506f44-be5f-461b-a9cd-e810a15a9dcb",
      name: "DarkSlateGray",
      description: "Esse tempore voluptatem totam reprehenderit eaque.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "312a8041-4ea1-4a14-bdc7-3e1be9b16b07",
      name: "Blue",
      description: "Ut illo molestiae est sed.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "345058cb-d1d2-4f67-ba76-ca3657b07d93",
      name: "Chartreuse",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "34bfc6e1-46ab-4c14-8171-cc9ef817c2f8",
      name: "LightGreen",
      description: "Adipisci in quibusdam quas velit minus.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "34d05122-b903-409a-9070-c651414c9b53",
      name: "HoneyDew",
      description: "Soluta ipsam quia qui blanditiis ipsum dolores provident.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "365ff8b3-81fb-4819-bf36-78c7f1bcc108",
      name: "Moccasin",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "36c0f3e3-7c4c-473d-b751-006ec97f6459",
      name: "DarkSlateGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "36e3f578-c7bc-40d2-ba6e-9932299a6e2b",
      name: "Darkorange",
      description: "Et non tempora totam temporibus suscipit neque.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "37f64e08-60a3-434b-a2a3-230d4a22665e",
      name: "AliceBlue",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "3f1fb126-b5ff-469e-ab58-b00ff27148b3",
      name: "Olive",
      description: "Debitis natus impedit hic quia magni repellendus ut.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "437ab056-63ed-4408-8640-afa4f49779ec",
      name: "BurlyWood",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "45a555db-564d-4fbf-81fc-2889c357a804",
      name: "PowderBlue",
      description: "Doloribus voluptas voluptatem enim qui soluta.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "4b79288c-c28c-4279-880c-a99b825d6e64",
      name: "Fuchsia",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "4e1316d5-854c-4ffa-989e-cb3a1562f527",
      name: "Snow",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "4fafc6df-ca69-411c-8b1e-ede026f965ce",
      name: "MediumSeaGreen",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "552346f1-1e48-4b23-9490-130aa0188fc0",
      name: "Chartreuse",
      description: "Delectus unde aut id modi.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "56cfa42e-0cf8-4d4c-bce0-2f9320a0c2c4",
      name: "OldLace",
      description: "Aperiam nam veritatis molestias nulla voluptas ea.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "58461fae-4135-49ed-9375-607aacf0259e",
      name: "Gold",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "594c7f75-ba1d-4624-bcb4-812dd6a62c10",
      name: "OldLace",
      description: "Dicta consectetur dolorum veniam et omnis voluptas.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "617e0f08-8286-437b-9b8f-bf2e114bc5ee",
      name: "Aquamarine",
      description: "Distinctio ad dignissimos adipisci quis consequatur.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "68c8c284-ee36-4e50-96fe-9dceb41d7b87",
      name: "Crimson",
      description:
        "Tenetur consequatur dolorem blanditiis voluptatibus nemo explicabo.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "6a854556-95c9-46b5-b8d8-c29f1d4b3039",
      name: "DimGray",
      description: "Nam consequuntur saepe fugit nihil est consequatur.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "6b534246-d8d8-459d-9509-2d6f75514a50",
      name: "CadetBlue",
      description: "Quia velit in vitae sunt.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "6bca7258-2731-4e81-952e-b10770d7fc72",
      name: "SpringGreen",
      description: "Est est est sed quasi perferendis quisquam qui.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "6c6bdeff-f1ae-4533-9fb7-2c5d067123c7",
      name: "Chocolate",
      description: "Omnis aliquid optio perspiciatis natus quo.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "704d527c-b008-41e8-8922-56934caf6c10",
      name: "Red",
      description: "Aut nulla voluptatem qui.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "70d5371e-52a7-4e44-915a-ba568e8ecb13",
      name: "Magenta",
      description: "Voluptatem harum sit optio aliquid.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "719918f8-336b-4860-9d0a-7e436c3c8f42",
      name: "HoneyDew",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "754df0a0-eaa3-47c8-ab24-014d3f9c6706",
      name: "NavajoWhite",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "7807361e-dbe8-43fb-98d9-da68640f4538",
      name: "FireBrick",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "7a29797e-8d0d-4ba4-a7ef-d8c757855529",
      name: "CornflowerBlue",
      description: "Vero et accusantium nemo nihil.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "7a9c24bd-dae6-4cd8-bfe2-21b1f97dd130",
      name: "MediumTurquoise",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "7ffe7cc4-4c91-4782-92e7-62c18e6b1817",
      name: "MistyRose",
      description: "Ad quos sint iste a.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "81e58455-89f0-4daa-837c-0f8661a1765c",
      name: "LightSteelBlue",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "821b26a3-1532-44f4-b37a-702c03c12b1e",
      name: "LightSalmon",
      description: "Error quos repellendus officia est.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "853a6f11-974b-4498-8ba8-20af29e30fc2",
      name: "DimGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "89a0c237-53fd-4d7b-8a43-c0d68dafd2ee",
      name: "Salmon",
      description: "Corrupti ut aut sit numquam.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "8c99b458-f385-4fea-8064-d09814765b24",
      name: "DarkBlue",
      description: "Sint voluptas officia voluptate consectetur reprehenderit.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "9308ee35-6568-4121-ae86-6813266e9789",
      name: "FireBrick",
      description: "Et autem quasi officiis expedita tenetur.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "93a91bec-c1f0-4aa4-8738-1231fedd2961",
      name: "DeepPink",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "955814b0-e3ba-4332-b9c9-4fa70770bada",
      name: "GoldenRod",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "96010b95-934a-4f66-ab46-73acb614bb87",
      name: "LightGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "98505428-51f1-4791-a4b7-4b28e9a79d31",
      name: "DarkGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "986a72ec-3fd8-41f5-bfa6-a72f62238284",
      name: "DarkMagenta",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "9b2ca6e1-3185-47eb-9644-00160c93c528",
      name: "MediumAquaMarine",
      description:
        "Delectus velit quasi ipsum quia vitae voluptatem accusamus.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "9ec1f680-425e-4768-a024-0e677fe3d904",
      name: "Chocolate",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "9eda1b58-3365-4acb-9de1-69e536b545a8",
      name: "PaleTurquoise",
      description: "Vero occaecati facilis ratione ut.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "9f674454-d47d-43df-8444-8f6f3d459265",
      name: "DarkRed",
      description: "Reprehenderit aut consectetur commodi omnis.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "a043000b-b6b7-437b-bf00-23c808a7e462",
      name: "CadetBlue",
      description: "Perspiciatis dolorem est voluptatem aliquam alias fugit.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "a6a77f67-6a0e-4997-be06-3780dadd0455",
      name: "Navy",
      description: "Eos voluptatem saepe hic dolorum repellat.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "a711143d-7035-44b1-b8b3-e42c81005dd0",
      name: "LightSlateGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "a7d85f08-afa7-4078-b5d2-3757045871b1",
      name: "Aquamarine",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "a8b5542c-eb1a-43b7-bff2-9306b4d6df56",
      name: "DimGray",
      description: "Harum ea sit unde expedita quibusdam vitae.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "aa30ad0f-6b20-4eac-8f97-90a73b935c29",
      name: "FireBrick",
      description: "At qui reprehenderit et ut et qui provident.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "aa7c7eb7-e460-4600-ab7a-a2bbca2fd068",
      name: "Yellow",
      description:
        "Voluptas iusto aut soluta mollitia eum voluptate excepturi ad.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "af2fb049-1ac3-4711-ab5f-b9ee4b1e7cf5",
      name: "LawnGreen",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "b36da707-0ad5-47cc-a973-ffe86ec5be54",
      name: "Gainsboro",
      description:
        "In molestias atque minima dignissimos nulla vitae exercitationem.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "b5350470-d9ac-433b-a6e8-5c017d4c4f43",
      name: "Crimson",
      description: "Illum et vel dolores earum eveniet.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "b68308e0-6614-4460-b94a-9102800d79b5",
      name: "DarkMagenta",
      description: "Quo id ea illo voluptatem non voluptate.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "bcee7c3e-938f-4c19-9fe5-070229d0ce11",
      name: "Black",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "bf64e2b2-3023-48d2-aee6-35b565e9d9f8",
      name: "Crimson",
      description: "Harum quidem voluptate aut odit soluta ratione at.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "c2de9a19-fcb5-4bd5-a8bb-b58586c333b6",
      name: "White",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "ca87af00-7489-4701-a615-33fae1b5886e",
      name: "Ivory",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "cbda1196-3497-48fa-9d88-b30774bf312e",
      name: "Thistle",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "ce88d742-397e-4145-8afa-892ebe2813ef",
      name: "MediumSlateBlue",
      description: "Assumenda voluptates qui ducimus ut.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "d0dd057c-c2d7-4439-94e8-77669f747487",
      name: "Violet",
      description: "Recusandae non nobis et doloribus consequatur optio.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "d64e4b18-577d-4742-869e-5c0ad34e00be",
      name: "Aqua",
      description: "Praesentium quisquam eos explicabo excepturi et.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "d74c36a9-d8ec-44a7-a18a-7a602e85679a",
      name: "Yellow",
      description: "Neque et consectetur atque qui.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "dba9406f-a051-420d-b460-c67cd9f24c04",
      name: "Cyan",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "ddd81587-3245-495e-a6a5-5e9e21c2894a",
      name: "PeachPuff",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "e41dea1e-36d2-4486-b710-328309b01612",
      name: "AliceBlue",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "e42ebe80-b61e-4f5b-82ab-2cca29598cb8",
      name: "LightGray",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "ebadea6a-662d-41a9-a553-bd67c8d93775",
      name: "OrangeRed",
      description: "OrangeRed",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-09-10 00:26:26",
    },
    {
      id: "eda39206-63be-4c30-ac52-50fdd2c67faa",
      name: "GhostWhite",
      description: "Neque necessitatibus cupiditate occaecati est.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "ee756faa-6f5b-4ca2-8daa-4cb257e659f7",
      name: "Plum",
      description:
        "Aspernatur dolorem sint exercitationem sit labore dolorum rerum.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "efad24b2-a1a4-4e76-857e-06eeebcefab8",
      name: "Linen",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "f31855db-5ee0-4f12-ac5f-6adc9e0b6355",
      name: "HotPink",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "f42dbf49-834c-4b3f-b87b-319eba3b3558",
      name: "LightBlue",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "f904f364-b252-4d4f-846f-12e1de80c308",
      name: "Orange",
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
    {
      id: "f99367be-6c3c-4ec9-90f5-48d572da55c4",
      name: "Maroon",
      description:
        "Voluptatum aut exercitationem et voluptatem deserunt expedita libero.",
      is_active: true,
      deleted_at: null,
      created_at: "2022-01-17 00:44:21",
      updated_at: "2022-01-17 00:44:21",
    },
  ],
};
