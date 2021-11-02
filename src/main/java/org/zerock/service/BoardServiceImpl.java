package org.zerock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.mapper.BoardMapper;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {
	//@Setter(onMethod_=@Autowired) spring 4.3 �̻󿡼� �ڵ� ó��.
	// BoardMapper mapper = new BoardMapper();
	private BoardMapper mapper;
	
	@Override
	public BoardVO get(long bno) {
		log.info("get....."+bno);
		return mapper.read(bno);
	}
	@Override
	public List<BoardVO> getList(Criteria cri) {
		log.info("getList........");
		return mapper.getListWithPaging(cri);
	}
	@Override
	public int getTotalCount(Criteria cri) {
		return mapper.getTotalCount(cri);
	}
	@Override
	public Iterable<BoardVO> getList() {
		// TODO Auto-generated method stub
		return null;
	}
}
