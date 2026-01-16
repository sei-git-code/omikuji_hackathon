package com.omikuji.dto;

public class OmikujiResultDto {
    private Long id;
    private String name;
    private Integer displayOrder;

    public OmikujiResultDto() {
    }

    public OmikujiResultDto(Long id, String name, Integer displayOrder) {
        this.id = id;
        this.name = name;
        this.displayOrder = displayOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
