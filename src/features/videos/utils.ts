import { Video, VideoPayload } from "../../types/Video";

export function mapVideoPayload(video: Video): {
  id: string;
  videoPayload: VideoPayload;
} {
  return {
    id: video.id,
    videoPayload: {
      title: video.title,
      description: video.description,
      year_launched: video.year_launched,
      opened: video.opened,
      rating: video.rating,
      duration: video.duration,
      genres_id: video.genres?.map((g) => g.id),
      categories_id: video.categories?.map((c) => c.id),
      cast_members_id: video.cast_members?.map((m) => m.id),
      thumb_file_URL: video.thumb_file_URL,
      banner_file_URL: video.banner_file_URL,
      trailer_file_URL: video.trailer_file_URL,
      video_file_URL: video.video_file_URL,
    },
  };
}
