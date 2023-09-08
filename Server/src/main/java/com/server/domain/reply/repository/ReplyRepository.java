package com.server.domain.reply.repository;

import com.server.domain.reply.dto.ReplyInfo;
import com.server.domain.reply.entity.Reply;
import com.server.domain.video.entity.Video;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @Query("select r from Reply r where r.video.videoId = :videoId")
    Page<ReplyInfo> findAllByVideoIdPaging(@Param("videoId") Long videoId, Pageable pageable);

    @Query("select r from Reply r where r.video.videoId = :videoId and (:star is null or r.star >= :star)")
    Page<ReplyInfo> findAllByVideoIdAndStarOrStarIsNull(@Param("videoId") Long videoId, @Param("star") Integer star, Pageable pageable);

    Optional<Reply> checkReplyExistByMemberIdAndVideoId(Long memberId, Long videoId);




}
