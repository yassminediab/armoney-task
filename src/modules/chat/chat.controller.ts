import {
  Controller,
  Get,
  Post,
  UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { ChatService } from './chat.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, callback) => {
          callback(null, `${Date.now()}.jpg`);
        }
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  async upload(@UploadedFiles() file: Express.Multer.File) {
    return {
      filename: file[0]?.filename,
    };
  }
}
