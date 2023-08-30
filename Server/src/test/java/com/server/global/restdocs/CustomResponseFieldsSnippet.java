package com.server.global.restdocs;

import org.springframework.http.MediaType;
import org.springframework.restdocs.operation.Operation;
import org.springframework.restdocs.payload.AbstractFieldsSnippet;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.PayloadSubsectionExtractor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

// 생성자의 인자 중 type을 보고 template에서 맞는 템플릿을 선택해서 동작한다.
public class CustomResponseFieldsSnippet extends AbstractFieldsSnippet {

	public CustomResponseFieldsSnippet(String type, PayloadSubsectionExtractor<?> subsectionExtractor,
		List<FieldDescriptor> descriptors, Map<String, Object> attributes,
		boolean ignoreUndocumentedFields) {
		super(type, descriptors, attributes, ignoreUndocumentedFields, subsectionExtractor);
	}

	@Override
	protected MediaType getContentType(Operation operation) {
		return operation.getResponse().getHeaders().getContentType();
	}

	@Override
	protected byte[] getContent(Operation operation) throws IOException {
		return operation.getResponse().getContent();
	}

	// 커스텀 템플릿 사용을 위한 함수
	public static CustomResponseFieldsSnippet customResponseFields(
		String type,
		PayloadSubsectionExtractor<?> subsectionExtractor,
		Map<String, Object> attributes,
		FieldDescriptor... descriptors) {
		return new CustomResponseFieldsSnippet(type, subsectionExtractor, Arrays.asList(descriptors), attributes, true);
	}
}
