package com.server.domain.reply.repository;

import com.server.domain.reply.dto.ReplyGetRequest;
import com.server.domain.reply.dto.ReplyInfo;
import com.server.domain.reply.entity.Reply;
import com.server.domain.video.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReplyRepository extends JpaRepository<Reply, Long> {


    @Query("select r from Reply r where r.video.videoId = :videoId")
    Page<ReplyInfo> findAllByVideoIdPaging(@Param("videoId") Long videoId, Pageable pageable);
}