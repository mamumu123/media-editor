// import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';

// 1. 将视频转换为音频格式
export function convertVideoToAudio(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .format('mp3')
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
}

// 2. 视频分割
export function splitVideo(inputPath: string, outputPath: string, startTime: string, duration: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .seekInput(startTime)
            .duration(duration)
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
}

// 3. 视频合并
export function mergeVideos(inputPaths: string[], outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = ffmpeg();

        inputPaths.forEach((inputPath) => {
            ffmpegCommand.input(inputPath);
        });

        ffmpegCommand
            .mergeToFile(outputPath, '')// TODO:
            .on('end', () => resolve())
            .on('error', (err) => reject(err));
    });
}

// 4. 分离出视频中的字幕轨道并导出为指定格式
export function extractSubtitles(inputPath: string, outputPath: string, format: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .outputOptions(['-map 0:s', '-c:s', format])
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
}